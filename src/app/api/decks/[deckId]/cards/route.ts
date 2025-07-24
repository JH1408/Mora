import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/utils/prisma';

const PAGE_SIZE = 20;

export async function GET(
  req: NextRequest,
  { params }: { params: { deckId: string } }
) {
  const { deckId } = params;
  const searchParams = req.nextUrl.searchParams;
  const cursorParam = searchParams.get('cursor');
  const limit = parseInt(searchParams.get('limit') || `${PAGE_SIZE}`, 10);

  const where = { deckId };

  let cursor: { createdAt: Date; id: string } | undefined = undefined;
  if (cursorParam) {
    try {
      const parsed = JSON.parse(cursorParam);
      if (parsed && parsed.createdAt && parsed.id) {
        cursor = { createdAt: new Date(parsed.createdAt), id: parsed.id };
      }
    } catch (error) {
      console.error('Invalid cursor:', error);
    }
  }

  const cards = await prisma.card.findMany({
    where,
    take: limit + 1, // fetch one extra to check if there's a next page
    ...(cursor ? { skip: 1, cursor } : {}),
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
  });

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
}
