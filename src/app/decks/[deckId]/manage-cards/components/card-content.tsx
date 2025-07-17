import type { Card } from '@prisma/client';
import { SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import DeleteCard from './delete-card';

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
        <div className='space-y-2 flex flex-col'>
          <Label className='text-text-secondary text-sm'>Front</Label>
          <div className='p-3 bg-neutral-1 rounded-md border border-neutral-3 flex-1'>
            <p className={`text-text-primary whitespace-pre-wrap ${fontClass}`}>
              {card.frontText}
            </p>
          </div>
        </div>
        <div className='space-y-2 flex flex-col'>
          <Label className='text-text-secondary text-sm'>Back</Label>
          <div className='p-3 bg-neutral-1 rounded-md border border-neutral-3 flex-1'>
            <p className={`text-text-primary whitespace-pre-wrap ${fontClass}`}>
              {card.backText}
            </p>
          </div>
        </div>
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
