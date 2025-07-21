'use client';

import type { Card as CardType } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import ErrorMessage from '@/components/error-message';
import { Card, CardContent as _CardContent } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';
import { useDeck, useDeleteCard, useUpdateCard } from '@/utils/hooks/useApi';
import { getLanguageClasses } from '@/utils/languages';

import CardContent from './components/card-content';
import CreateNewCard from './components/create-new-card';
import EditCardForm from './components/edit-card';
import Header from './components/header';

const ManageCardsPage = () => {
  const { deckId } = useParams();
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

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
    updateCard({
      id: cardId,
      data: {
        frontText: updatedCard.frontText,
        backText: updatedCard.backText,
      },
    });
    setEditingCardId(null);
  };

  const fontClass = getLanguageClasses(deck?.language?.script).fontClass;

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100 pb-6 relative'>
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

        {isLoadingDeck && <Spinner className='absolute top-1/2 left-1/2 ' />}

        {!!deck?.cardsCount && deck.cardsCount > 0 && (
          <section>
            <h2 className='text-2xl font-bold font-heading text-text-primary py-6'>
              Existing Cards ({deck.cardsCount})
            </h2>
            {deck.cards?.map((card) => (
              <Card
                key={card.id}
                className='hover:shadow-primary py-6 transition-shadow duration-200 border-neutral-3 mb-4'
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
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ManageCardsPage;
