import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  deckSchema,
  decksSchema,
  createDeckSchema,
  type Deck,
  type Decks,
} from '@/lib/schemas';

// Re-export for backward compatibility
export { deckSchema, decksSchema };
export type { Deck, Decks };

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await request.json();
    const validatedData = createDeckSchema.parse(body);

    // Check if the language exists
    const language = await prisma.language.findUnique({
      where: { id: validatedData.languageId },
    });

    if (!language) {
      return NextResponse.json(
        { error: 'Language not found' },
        { status: 404 }
      );
    }

    // Create the deck
    const deck = await prisma.deck.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        difficulty: validatedData.difficulty,
        languageId: validatedData.languageId,
        userId: session.user.id,
      },
      include: {
        language: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(deck, { status: 201 });
  } catch (error) {
    console.error('Error creating deck:', error);

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

// Get all decks for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decks = await prisma.deck.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        language: true,
        _count: {
          select: {
            cards: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(decks);
  } catch (error) {
    console.error('Error fetching decks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
