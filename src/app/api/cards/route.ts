import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { build429Response, checkRateLimit } from '@/utils/rateLimit';
import { createCardSchema } from '@/utils/schemas';

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit: per-user card creation
    const rate = await checkRateLimit({
      limiterName: 'card-create-per-user-1m-30',
      windowMs: 60_000,
      maxRequests: 30,
      key: `card:create:${session.user.id}`,
    });
    if (!rate.success)
      return build429Response(rate, 'Rate limit exceeded. Please slow down.');

    // Parse and validate the request body
    const body = await request.json();
    const validatedData = createCardSchema.parse(body);

    // Check if the deck exists and belongs to the user
    const deck = await prisma.deck.findUnique({
      where: {
        id: validatedData.deckId,
        userId: session.user.id,
      },
    });

    if (!deck) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    // Create the card
    const card = await prisma.card.create({
      data: {
        deckId: validatedData.deckId,
        frontText: validatedData.frontText,
        backText: validatedData.backText,
        phoneticSpelling: validatedData.phoneticSpelling,
        usageContext: validatedData.usageContext,
        tags: validatedData.tags || [],
        handwritingData: validatedData.handwritingData,
        handwritingImage: validatedData.handwritingImage,
      },
    });

    // Update the deck's card count
    await prisma.deck.update({
      where: { id: validatedData.deckId },
      data: { cardsCount: { increment: 1 } },
    });

    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    console.error('Error creating card:', error);

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
