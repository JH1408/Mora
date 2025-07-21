import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { updateCardSchema } from '@/utils/schemas';

// Delete a card
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cardId } = await params;
    if (!cardId) {
      return NextResponse.json(
        { error: 'Card ID is required' },
        { status: 400 }
      );
    }

    // Check if the card exists and belongs to the user
    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
        deck: {
          userId: session.user.id,
        },
      },
      include: {
        deck: true,
      },
    });

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    // Delete the card
    await prisma.card.delete({
      where: { id: cardId },
    });

    // Update the deck's card count
    await prisma.deck.update({
      where: { id: card.deckId },
      data: { cardsCount: { decrement: 1 } },
    });

    return NextResponse.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update a card
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cardId } = await params;
    if (!cardId) {
      return NextResponse.json(
        { error: 'Card ID is required' },
        { status: 400 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    const validatedData = updateCardSchema.parse(body);

    // Check if the card exists and belongs to the user
    const existingCard = await prisma.card.findFirst({
      where: {
        id: cardId,
        deck: {
          userId: session.user.id,
        },
      },
    });

    if (!existingCard) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    // Update the card
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: {
        ...(validatedData.frontText !== undefined && {
          frontText: validatedData.frontText,
        }),
        ...(validatedData.backText !== undefined && {
          backText: validatedData.backText,
        }),
        ...(validatedData.phoneticSpelling !== undefined && {
          phoneticSpelling: validatedData.phoneticSpelling,
        }),
        ...(validatedData.usageContext !== undefined && {
          usageContext: validatedData.usageContext,
        }),
        ...(validatedData.tags !== undefined && { tags: validatedData.tags }),
        ...(validatedData.handwritingData !== undefined && {
          handwritingData: validatedData.handwritingData,
        }),
      },
    });

    return NextResponse.json(updatedCard);
  } catch (error) {
    console.error('Error updating card:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
