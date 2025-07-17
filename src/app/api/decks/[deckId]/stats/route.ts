import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { deckStatsSchema, type DeckStats } from '@/lib/schemas';
import { getDueCards } from '@/utils/spacedRepetition';

// Re-export for backward compatibility
export { deckStatsSchema };
export type { DeckStats };

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

    // Get all cards with their progress
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
    });

    // Transform cards to include progress data
    const cardsWithProgress = cards.map((card) => ({
      id: card.id,
      cardProgress: card.cardProgress[0] || null,
    }));

    // Get due cards
    const dueCards = getDueCards(cardsWithProgress);

    // Get overall progress statistics
    const progressStats = await prisma.cardProgress.aggregate({
      where: {
        userId: session.user.id,
        card: {
          deckId: deckId,
        },
      },
      _sum: {
        totalReviews: true,
        correctReviews: true,
        repetitions: true,
      },
      _avg: {
        easinessFactor: true,
      },
      _count: {
        id: true,
      },
    });

    // Get recent study sessions
    const recentSessions = await prisma.studySession.findMany({
      where: {
        userId: session.user.id,
        deckId: deckId,
        completedAt: {
          not: null,
        },
      },
      orderBy: {
        completedAt: 'desc',
      },
      take: 10,
    });

    // Calculate statistics
    const totalCards = cards.length;
    const cardsWithProgressCount = progressStats._count.id;
    const totalReviews = progressStats._sum.totalReviews || 0;
    const correctReviews = progressStats._sum.correctReviews || 0;
    const overallAccuracy =
      totalReviews > 0 ? Math.round((correctReviews / totalReviews) * 100) : 0;
    const averageEasinessFactor = progressStats._avg.easinessFactor || 2.5;
    const totalRepetitions = progressStats._sum.repetitions || 0;

    // Get cards by difficulty level
    const easyCards = cardsWithProgress.filter(
      (card) => card.cardProgress && card.cardProgress.easinessFactor >= 2.5
    ).length;
    const mediumCards = cardsWithProgress.filter(
      (card) =>
        card.cardProgress &&
        card.cardProgress.easinessFactor >= 1.8 &&
        card.cardProgress.easinessFactor < 2.5
    ).length;
    const hardCards = cardsWithProgress.filter(
      (card) => card.cardProgress && card.cardProgress.easinessFactor < 1.8
    ).length;

    // Calculate study streak
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const recentSessionsByDate = recentSessions.reduce((acc, session) => {
      const date = session.completedAt!.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let studyStreak = 0;
    const currentDate = new Date(today);

    while (recentSessionsByDate[currentDate.toISOString().split('T')[0]]) {
      studyStreak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return NextResponse.json({
      deck: {
        id: deck.id,
        name: deck.name,
        language: deck.language,
        totalCards,
        cardsWithProgress: cardsWithProgressCount,
        dueCards: dueCards.length,
      },
      progress: {
        totalReviews,
        correctReviews,
        overallAccuracy,
        averageEasinessFactor: Math.round(averageEasinessFactor * 100) / 100,
        totalRepetitions,
        studyStreak,
      },
      difficultyBreakdown: {
        easy: easyCards,
        medium: mediumCards,
        hard: hardCards,
        new: totalCards - cardsWithProgressCount,
      },
      recentSessions: recentSessions.map((session) => ({
        id: session.id,
        cardsStudied: session.cardsStudied,
        correctAnswers: session.correctAnswers,
        accuracy:
          session.cardsStudied > 0
            ? Math.round((session.correctAnswers / session.cardsStudied) * 100)
            : 0,
        studyMode: session.studyMode,
        sessionDuration: session.sessionDuration,
        completedAt: session.completedAt,
      })),
    });
  } catch (error) {
    console.error('Error getting deck statistics:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
