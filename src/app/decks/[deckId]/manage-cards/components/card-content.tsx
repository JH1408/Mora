import Image from 'next/image';

import type { Card } from '@prisma/client';
import { SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cardFields } from '@/utils/utils';

import DeleteCard from './delete-card';

const formatCardValue = (value: unknown) => {
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (value instanceof Date) return value.toLocaleString();
  if (value === null || value === undefined) return '';
  return JSON.stringify(value);
};

const getPresentFields = (card: Card) => {
  return cardFields.filter(
    (field) =>
      !!card[field.value as keyof Card] && field.value !== 'usageContext'
  );
};

const getUsageContextField = (card: Card) => {
  return cardFields.find(
    (field) =>
      field.value === 'usageContext' && !!card[field.value as keyof Card]
  );
};

const renderFieldBlock = (
  label: string,
  value: unknown,
  key: string,
  fontClass: string
) => (
  <div className='space-y-2 flex flex-col' key={key}>
    <Label className='text-text-secondary text-sm'>{label}</Label>
    <div className='p-3 bg-neutral-1 rounded-md border border-neutral-3 flex-1'>
      <p
        className={`text-text-primary whitespace-pre-wrap ${fontClass} select-text`}
      >
        {formatCardValue(value)}
      </p>
    </div>
  </div>
);

const renderHandwritingBlock = (src: string) => (
  <div
    className='space-y-2 flex flex-col justify-stretch'
    key='handwritingImage'
  >
    <Label className='text-text-secondary text-sm'>Handwritten Content</Label>
    <div className='p-3 bg-neutral-1 rounded-md border border-neutral-3 flex-1 flex items-center justify-center'>
      <Image
        src={src}
        alt='Handwritten Content'
        width={200}
        height={200}
        className='object-contain max-h-[150px] w-auto h-auto'
      />
    </div>
  </div>
);

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
  const hasHandwriting = !!card.handwritingImage;
  const usageContextField = getUsageContextField(card);

  const presentFields = getPresentFields(card);

  const numFields = presentFields.length + (hasHandwriting ? 1 : 0);

  let gridContent;
  if (numFields === 2) {
    // Only 2 fields: side by side
    gridContent = (
      <>
        {presentFields.map((field) => {
          return renderFieldBlock(
            field.label,
            card[field.value as keyof Card],
            field.value! + 'card',
            fontClass
          );
        })}
      </>
    );
  } else if (numFields === 3 && !hasHandwriting) {
    // 3 fields (front, back, phonetic): two rows, phonetic in its own row, single column
    gridContent = (
      <>
        {presentFields.map((field) => {
          if (field.value === 'phoneticSpelling') {
            return (
              <div className='md:col-span-1' key={field.value + 'card'}>
                {renderFieldBlock(
                  field.label,
                  card.phoneticSpelling,
                  field.value! + 'card',
                  fontClass
                )}
              </div>
            );
          }
          return renderFieldBlock(
            field.label,
            card[field.value as keyof Card],
            field.value! + 'card',
            fontClass
          );
        })}
      </>
    );
  } else if (hasHandwriting) {
    // 3, 4, 5 fields, handwriting present: left column = text fields, right column = handwriting image
    gridContent = (
      <>
        {/* Left column: stack text fields */}
        <div className='flex flex-col gap-4 justify-between'>
          {presentFields.map((field) => {
            return renderFieldBlock(
              field.label,
              card[field.value as keyof Card],
              field.value! + 'card',
              fontClass
            );
          })}
        </div>
        {/* Right column: handwriting image (spans height) */}
        {renderHandwritingBlock(card.handwritingImage || '')}
      </>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch'>
        {gridContent}
      </div>
      {usageContextField && (
        <div className='mt-4'>
          {renderFieldBlock(
            usageContextField.label,
            card.usageContext,
            usageContextField.value + 'card',
            fontClass
          )}
        </div>
      )}
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
