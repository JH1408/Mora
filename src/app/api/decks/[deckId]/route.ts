import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { deckId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deckId } = params;
    if (!deckId) {
      return NextResponse.json(
        { error: 'Deck ID is required' },
        { status: 400 }
      );
    }

    const deck = await prisma.deck.findUnique({
      where: {
        id: deckId,
        userId: session.user.id,
      },
      include: {
        language: true,
        _count: {
          select: { cards: true },
        },
        cards: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!deck) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    return NextResponse.json(deck);
  } catch (error) {
    console.error('Error fetching deck:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
