import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { studyParamsSchema } from '@/lib/schemas';
import { getDueCards, sortCardsByPriority } from '@/utils/spacedRepetition';

export async function GET(
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const studyMode = searchParams.get('studyMode') || 'recognition';

    // Validate parameters
    const validatedParams = studyParamsSchema.parse({ limit, studyMode });

    // Check if the deck exists and belongs to the user
    const deck = await prisma.deck.findUnique({
      where: {
        id: deckId,
        userId: session.user.id,
      },
      include: {
        language: true,
      },
    });

    if (!deck) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    // Get all cards in the deck with their progress
    const cards = await prisma.card.findMany({
      where: {
        deckId: deckId,
      },
      include: {
        cardProgress: {
          where: {
            userId: session.user.id,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Transform cards to include progress data
    const cardsWithProgress = cards.map((card) => ({
      id: card.id,
      frontText: card.frontText,
      backText: card.backText,
      phoneticSpelling: card.phoneticSpelling,
      usageContext: card.usageContext,
      tags: card.tags,
      createdAt: card.createdAt,
      cardProgress: card.cardProgress[0] || null,
    }));

    // Get due cards and sort by priority
    const dueCards = getDueCards(cardsWithProgress);
    const sortedCards = sortCardsByPriority(dueCards);

    // Limit the number of cards returned
    const studyCards = sortedCards.slice(0, validatedParams.limit);

    // Create or update study session (mode-agnostic, but set studyMode to 'recognition')
    const today = new Date().toISOString().split('T')[0];
    const sessionId = `${deckId}-${session.user.id}-${today}`;
    const studySession = await prisma.studySession.upsert({
      where: {
        id: sessionId,
      },
      update: {
        cardsStudied: 0,
        correctAnswers: 0,
        startedAt: new Date(),
        completedAt: null,
        studyMode: 'recognition', // always set to 'recognition' for now
      },
      create: {
        id: sessionId,
        userId: session.user.id,
        deckId: deckId,
        cardsStudied: 0,
        correctAnswers: 0,
        startedAt: new Date(),
        studyMode: 'recognition', // always set to 'recognition' for now
      },
    });

    const response = {
      deck: {
        id: deck.id,
        name: deck.name,
        language: deck.language,
      },
      studySession: {
        id: studySession.id,
        startedAt: studySession.startedAt,
      },
      cards: studyCards,
      totalDue: dueCards.length,
      totalCards: cards.length,
    };

    // Optionally validate response shape at runtime (for dev/debug)
    // studySessionDataSchema.parse(response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error getting study cards:', error);

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
