import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prisma';

const PAGE_SIZE = 20;

const querySchema = z.object({
  cursor: z.string().max(2000).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
  search: z.string().trim().min(1).max(200).optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ deckId: string }> }
) {
  try {
    const { deckId } = await params;

    // Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate and parse query parameters
    const parsed = querySchema.safeParse(
      Object.fromEntries(req.nextUrl.searchParams)
    );
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { cursor: cursorParam, limit = PAGE_SIZE, search } = parsed.data;

    // Ensure deck belongs to the authenticated user
    const deck = await prisma.deck.findFirst({
      where: {
        id: deckId,
        userId: session.user.id,
      },
    });

    if (!deck) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    // Parse cursor for pagination
    let cursor: { createdAt: Date; id: string } | undefined = undefined;
    if (cursorParam) {
      try {
        const parsed = JSON.parse(cursorParam);
        if (parsed && parsed.createdAt && parsed.id) {
          cursor = { createdAt: new Date(parsed.createdAt), id: parsed.id };
        }
      } catch {
        return NextResponse.json(
          { error: 'Invalid cursor format' },
          { status: 400 }
        );
      }
    }

    // Build where clause with search filtering
    const where = {
      deckId,
      ...(search
        ? {
            OR: [
              { frontText: { contains: search, mode: 'insensitive' as const } },
              { backText: { contains: search, mode: 'insensitive' as const } },
              {
                phoneticSpelling: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
              {
                usageContext: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
            ],
          }
        : {}),
    };

    // Fetch cards with pagination and search
    const cards = await prisma.card.findMany({
      where,
      take: limit + 1, // fetch one extra to check if there's a next page
      ...(cursor ? { skip: 1, cursor } : {}),
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    // Determine next cursor for pagination
    let nextCursor: string | null = null;
    if (cards.length > limit) {
      const nextCard = cards.pop();
      nextCursor = JSON.stringify({
        createdAt: nextCard!.createdAt,
        id: nextCard!.id,
      });
    }

    return NextResponse.json({
      cards,
      nextCursor,
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
