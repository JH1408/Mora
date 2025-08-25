import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { studyParamsSchema } from '@/utils/schemas';
import { getDueCards, sortCardsByPriority } from '@/utils/spacedRepetition';
import type { CardProgressData } from '@/utils/spacedRepetition';

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
    const cursorParam = searchParams.get('cursor');

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
    const cardsWithProgress: Array<{
      id: string;
      frontText: string;
      backText: string;
      phoneticSpelling?: string;
      usageContext?: string;
      tags?: string[];
      handwritingData?: unknown;
      handwritingImage?: string;
      createdAt: Date;
      cardProgress?: CardProgressData | null;
    }> = cards.map((card) => ({
      id: card.id,
      frontText: card.frontText,
      backText: card.backText,
      phoneticSpelling: card.phoneticSpelling ?? undefined,
      usageContext: card.usageContext ?? undefined,
      tags: Array.isArray(card.tags) ? (card.tags as string[]) : undefined,
      handwritingData: card.handwritingData ?? undefined,
      handwritingImage: card.handwritingImage ?? undefined,
      createdAt: card.createdAt,
      cardProgress: card.cardProgress[0] || null,
    }));

    // Get due cards and sort by priority
    const dueCards = getDueCards(cardsWithProgress);
    const sortedCards = sortCardsByPriority(dueCards);

    // Cursor-based pagination for due cards
    let startIdx = 0;
    if (cursorParam) {
      try {
        const parsed = JSON.parse(cursorParam);
        if (parsed && parsed.createdAt && parsed.id) {
          startIdx = sortedCards.findIndex(
            (card) =>
              card.createdAt instanceof Date &&
              new Date(card.createdAt).getTime() ===
                new Date(parsed.createdAt).getTime() &&
              card.id === parsed.id
          );
          if (startIdx !== -1) {
            startIdx += 1; // start after the cursor
          } else {
            startIdx = 0;
          }
        }
      } catch (error) {
        console.error('Invalid cursor:', error);
      }
    }

    const paginatedCards = sortedCards.slice(
      startIdx,
      startIdx + validatedParams.limit + 1
    );
    let nextCursor: string | null = null;
    if (paginatedCards.length > validatedParams.limit) {
      const nextCard = paginatedCards.pop();
      nextCursor = JSON.stringify({
        createdAt:
          nextCard!.createdAt instanceof Date
            ? nextCard!.createdAt.toISOString()
            : nextCard!.createdAt,
        id: nextCard!.id,
      });
    }
    const studyCards = paginatedCards;

    // Create or update study session (mode-agnostic, but set studyMode to 'recognition')
    const today = new Date().toISOString().split('T')[0];
    const sessionId = `${deckId}-${session.user.id}-${today}`;
    const studySession = await prisma.studySession.upsert({
      where: {
        id: sessionId,
      },
      update: {
        // For now, leave this empty or only update fields that should change
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
      nextCursor, // <-- add nextCursor to response
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
