import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { submitStudySchema } from '@/utils/schemas';
import { calculateNextReview } from '@/utils/spacedRepetition';

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
    console.log({ body });
    const validatedData = submitStudySchema.parse(body);

    // Check if the card exists and belongs to the user's deck
    const card = await prisma.card.findFirst({
      where: {
        id: validatedData.cardId,
        deck: {
          id: deckId,
          userId: session.user.id,
        },
      },
    });

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    // Get or create card progress
    let cardProgress = await prisma.cardProgress.findUnique({
      where: {
        userId_cardId: {
          userId: session.user.id,
          cardId: validatedData.cardId,
        },
      },
    });

    if (!cardProgress) {
      // Create new progress record
      cardProgress = await prisma.cardProgress.create({
        data: {
          userId: session.user.id,
          cardId: validatedData.cardId,
          easinessFactor: 2.5,
          repetitions: 0,
          intervalDays: 1,
          nextReviewDate: new Date(),
          totalReviews: 0,
          correctReviews: 0,
        },
      });
    }

    // Calculate new progress using SM-2 algorithm (no difficulty)
    const newProgress = calculateNextReview(
      {
        easinessFactor: cardProgress.easinessFactor,
        repetitions: cardProgress.repetitions,
        intervalDays: cardProgress.intervalDays,
        nextReviewDate: cardProgress.nextReviewDate,
        totalReviews: cardProgress.totalReviews,
        correctReviews: cardProgress.correctReviews,
      },
      validatedData.isCorrect
    );

    // Update card progress
    const updatedProgress = await prisma.cardProgress.update({
      where: {
        userId_cardId: {
          userId: session.user.id,
          cardId: validatedData.cardId,
        },
      },
      data: {
        easinessFactor: newProgress.easinessFactor,
        repetitions: newProgress.repetitions,
        intervalDays: newProgress.intervalDays,
        nextReviewDate: newProgress.nextReviewDate,
        totalReviews: newProgress.totalReviews,
        correctReviews: newProgress.correctReviews,
        lastDifficultyRating: null,
        updatedAt: new Date(),
      },
    });

    // Update study session if provided
    let studySession = null;
    if (validatedData.studySessionId) {
      studySession = await prisma.studySession.update({
        where: {
          id: validatedData.studySessionId,
          userId: session.user.id,
          deckId: deckId,
        },
        data: {
          cardsStudied: {
            increment: 1,
          },
          correctAnswers: {
            increment: validatedData.isCorrect ? 1 : 0,
          },
        },
      });
    }

    return NextResponse.json({
      cardProgress: updatedProgress,
      studySession,
      nextReviewDate: newProgress.nextReviewDate,
      accuracy:
        newProgress.totalReviews > 0
          ? Math.round(
              (newProgress.correctReviews / newProgress.totalReviews) * 100
            )
          : 0,
    });
  } catch (error) {
    console.error('Error submitting study result:', error);

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
