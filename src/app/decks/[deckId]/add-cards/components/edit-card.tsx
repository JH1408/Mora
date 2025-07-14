import { Card } from '@prisma/client';
import { X, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const EditCardForm = ({
  card,
  onSave,
  onCancel,
  isUpdatingCard,
}: {
  card: Card;
  onSave: (updatedCard: Partial<Card>) => void;
  onCancel: () => void;
  isUpdatingCard: boolean;
}) => {
  const [frontText, setFrontText] = useState(card.frontText);
  const [backText, setBackText] = useState(card.backText);

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label className='text-text-secondary text-sm'>Front</Label>
          <Textarea
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
            className='min-h-[80px] resize-none border-neutral-4 focus:border-primary-500'
          />
        </div>
        <div className='space-y-2'>
          <Label className='text-text-secondary text-sm'>Back</Label>
          <Textarea
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            className='min-h-[80px] resize-none border-neutral-4 focus:border-primary-500'
          />
        </div>
      </div>
      <div className='flex justify-end space-x-2'>
        <Button variant='ghost' size='sm' onClick={onCancel}>
          <X className='h-4 w-4 mr-1' />
          Cancel
        </Button>
        <Button
          size='sm'
          onClick={() => onSave({ frontText, backText })}
          disabled={
            !frontText.trim().length ||
            !backText.trim().length ||
            isUpdatingCard
          }
        >
          {isUpdatingCard ? (
            <Loader2 className='h-4 w-4 mr-1' />
          ) : (
            <>
              <Check className='h-4 w-4 mr-1' />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditCardForm;
