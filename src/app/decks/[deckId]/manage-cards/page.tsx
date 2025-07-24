'use client';

import type { Card as CardType } from '@prisma/client';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useRef, useEffect } from 'react';

import ErrorMessage from '@/components/error-message';
import { Card, CardContent as _CardContent } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';
import {
  useDeck,
  useDeleteCard,
  useInfiniteCards,
  useUpdateCard,
} from '@/utils/hooks/useApi';
import { getLanguageClasses } from '@/utils/languages';

import CardContent from './components/card-content';
import CreateNewCard from './components/create-new-card';
import EditCardForm from './components/edit-card';
import Header from './components/header';

const ManageCardsPage = () => {
  const { deckId } = useParams();
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const {
    data: deck,
    isError: isDeckError,
    isLoading: isLoadingDeck,
  } = useDeck(deckId as string);
  const { mutate: deleteCard, isPending: isDeletingCard } = useDeleteCard();
  const { mutate: updateCard, isPending: isUpdatingCard } = useUpdateCard();

  const handleUpdateCard = (cardId: string, updatedCard: Partial<CardType>) => {
    if (
      !updatedCard.frontText?.trim().length ||
      !updatedCard.backText?.trim().length
    ) {
      return;
    }
    updateCard(
      {
        id: cardId,
        data: {
          frontText: updatedCard.frontText,
          backText: updatedCard.backText,
          phoneticSpelling: updatedCard.phoneticSpelling || undefined,
          handwritingData: updatedCard.handwritingData
            ? (updatedCard.handwritingData as string)
            : undefined,
          handwritingImage: updatedCard.handwritingImage
            ? (updatedCard.handwritingImage as string)
            : undefined,
        },
      },
      {
        onSuccess: () => {
          setEditingCardId(null);
        },
      }
    );
  };

  const fontClass = getLanguageClasses(deck?.language?.script).fontClass;

  const {
    data: cards,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingCards,
  } = useInfiniteCards(deckId as string);

  const allCards = useMemo(
    () => (cards ? cards.pages.flatMap((page) => page.cards) : []),
    [cards]
  );

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allCards.length + 1 : allCards.length,
    getScrollElement: () => outerRef.current,
    estimateSize: () => 300,
    overscan: 5,
  });

  const items = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...items].reverse();
    if (
      lastItem &&
      lastItem.index >= allCards.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allCards.length, isFetchingNextPage, items]);

  return (
    <div
      ref={outerRef}
      className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100 pb-6 relative overflow-y-auto'
      style={{ width: '100vw', height: '100vh' }}
    >
      <Header deckName={deck?.name} deckId={deckId as string} />
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <CreateNewCard
          deckId={deckId as string}
          deckScript={deck?.language?.script}
        />
        {isDeckError && (
          <section>
            <ErrorMessage message="Oops, we couldn't load this deck." />
          </section>
        )}
        {(isLoadingDeck || isLoadingCards) && (
          <Spinner className='relative top-24 left-1/2 ' />
        )}
        <section>
          {deck?.cardsCount && deck?.cardsCount > 0 && allCards.length > 0 && (
            <h2 className='text-2xl font-bold font-heading text-text-primary py-6'>
              Existing Cards ({deck?.cardsCount})
            </h2>
          )}
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${items[0]?.start ?? 0}px)`,
              }}
            >
              {items.map((row) => {
                const isLoaderRow = row.index > allCards.length - 1;
                if (isLoaderRow) {
                  return (
                    <div
                      key={row.key}
                      data-index={row.index}
                      className='flex justify-center'
                    >
                      <Spinner />
                    </div>
                  );
                }
                const card = allCards[row.index];
                return (
                  <div
                    key={row.key}
                    data-index={row.index}
                    ref={rowVirtualizer.measureElement}
                  >
                    <Card
                      key={card.id}
                      className='hover:shadow-primary py-6 transition-shadow duration-200 border-neutral-3 mb-6 w-full'
                    >
                      <_CardContent>
                        {editingCardId === card.id ? (
                          <EditCardForm
                            card={card}
                            onSave={(updatedCard) =>
                              handleUpdateCard(card.id, updatedCard)
                            }
                            onCancel={() => setEditingCardId(null)}
                            isUpdatingCard={isUpdatingCard}
                            fontClass={fontClass}
                          />
                        ) : (
                          <CardContent
                            card={card}
                            setEditingCardId={setEditingCardId}
                            deleteCard={deleteCard}
                            isDeletingCard={isDeletingCard}
                            fontClass={fontClass}
                          />
                        )}
                      </_CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageCardsPage;
