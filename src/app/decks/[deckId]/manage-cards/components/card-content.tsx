import type { Card } from '@prisma/client';
import { SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import DeleteCard from './delete-card';

const formatCardValue = (value: unknown) => {
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (value instanceof Date) return value.toLocaleString();
  if (value === null || value === undefined) return '';
  return JSON.stringify(value);
};

const cardFields = {
  frontText: {
    label: 'Front',
    value: 'frontText',
  },
  backText: {
    label: 'Back',
    value: 'backText',
  },
  phoneticSpelling: {
    label: 'Phonetic Spelling',
    value: 'phoneticSpelling',
  },
};

const CardContent = ({
  card,
  setEditingCardId,
  deleteCard,
  isDeletingCard,
  fontClass,
}: {
  card: Card;
  setEditingCardId: (id: string) => void;
  deleteCard: (id: string) => void;
  isDeletingCard: boolean;
  fontClass: string;
}) => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch'>
        {Object.values(cardFields).map((field) => (
          <div className='space-y-2 flex flex-col' key={field.value}>
            <Label className='text-text-secondary text-sm'>{field.label}</Label>
            <div className='p-3 bg-neutral-1 rounded-md border border-neutral-3 flex-1'>
              <p
                className={`text-text-primary whitespace-pre-wrap ${fontClass}`}
              >
                {formatCardValue(card[field.value as keyof Card])}
              </p>
            </div>
          </div>
        ))}
      </div>
      <CardFooter className='mt-4'>
        <div className='flex items-center space-x-4 w-full justify-end'>
          <Button
            onClick={() => setEditingCardId(card.id)}
            disabled={false}
            variant='ghost-secondary'
            size='sm'
          >
            <SquarePen className='h-4 w-4 mr-1' />
            Edit
          </Button>
          <DeleteCard
            card={card}
            deleteCard={deleteCard}
            isDeletingCard={isDeletingCard}
          />
        </div>
      </CardFooter>
    </>
  );
};

export default CardContent;
