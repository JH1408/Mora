import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  completeStudySessionSchema,
  completeSessionSchema,
  type CompleteStudySession,
} from '@/lib/schemas';

// Re-export for backward compatibility
export { completeStudySessionSchema };
export type { CompleteStudySession };

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ deckId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deckId } = await params;
    if (!deckId) {
      return NextResponse.json(
        { error: 'Deck ID is required' },
        { status: 400 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    const validatedData = completeSessionSchema.parse(body);

    // Get the study session
    const studySession = await prisma.studySession.findFirst({
      where: {
        id: validatedData.studySessionId,
        userId: session.user.id,
        deckId: deckId,
      },
      include: {
        deck: {
          include: {
            language: true,
          },
        },
      },
    });

    if (!studySession) {
      return NextResponse.json(
        { error: 'Study session not found' },
        { status: 404 }
      );
    }

    // Complete the study session
    const completedSession = await prisma.studySession.update({
      where: {
        id: validatedData.studySessionId,
      },
      data: {
        sessionDuration: validatedData.sessionDuration,
        completedAt: new Date(),
      },
    });

    // Calculate session statistics
    const accuracy =
      completedSession.cardsStudied > 0
        ? Math.round(
            (completedSession.correctAnswers / completedSession.cardsStudied) *
              100
          )
        : 0;

    // Get deck statistics
    const deckStats = await prisma.cardProgress.aggregate({
      where: {
        userId: session.user.id,
        card: {
          deckId: deckId,
        },
      },
      _sum: {
        totalReviews: true,
        correctReviews: true,
      },
      _count: {
        id: true,
      },
    });

    const totalCards = await prisma.card.count({
      where: {
        deckId: deckId,
      },
    });

    const overallAccuracy =
      deckStats._sum.totalReviews && deckStats._sum.totalReviews > 0
        ? Math.round(
            (deckStats._sum.correctReviews! / deckStats._sum.totalReviews) * 100
          )
        : 0;

    return NextResponse.json({
      studySession: {
        id: completedSession.id,
        cardsStudied: completedSession.cardsStudied,
        correctAnswers: completedSession.correctAnswers,
        accuracy,
        sessionDuration: completedSession.sessionDuration,
        studyMode: completedSession.studyMode,
        startedAt: completedSession.startedAt,
        completedAt: completedSession.completedAt,
      },
      deck: {
        id: studySession.deck.id,
        name: studySession.deck.name,
        language: studySession.deck.language,
        totalCards,
        cardsWithProgress: deckStats._count.id,
        overallAccuracy,
        totalReviews: deckStats._sum.totalReviews || 0,
      },
    });
  } catch (error) {
    console.error('Error completing study session:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
