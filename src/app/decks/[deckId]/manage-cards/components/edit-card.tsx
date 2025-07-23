import { Card } from '@prisma/client';
import { X, Check, Loader2, Pen } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import CanvasModal from './canvas-modal';

const LabeledTextarea = ({
  label,
  value,
  onChange,
  fontClass,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fontClass: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className='space-y-2'>
    <Label className='text-text-secondary text-sm'>{label}</Label>
    <Textarea
      value={value}
      onChange={onChange}
      dir='auto'
      className={`min-h-[80px] resize-none border-neutral-4 focus:border-primary-500 ${fontClass}`}
    />
  </div>
);

const EditCardForm = ({
  card,
  onSave,
  onCancel,
  isUpdatingCard,
  fontClass,
}: {
  card: Card;
  onSave: (updatedCard: Partial<Card>) => void;
  onCancel: () => void;
  isUpdatingCard: boolean;
  fontClass: string;
}) => {
  const [frontText, setFrontText] = useState(card.frontText);
  const [backText, setBackText] = useState(card.backText);
  const [phoneticSpelling, setPhoneticSpelling] = useState(
    card.phoneticSpelling || ''
  );
  const [showHandwritingCanvas, setShowHandwritingCanvas] = useState(false);
  const [handwritingData, setHandwritingData] = useState(
    card.handwritingData || null
  );
  const [handwritingImage, setHandwritingImage] = useState(
    card.handwritingImage || null
  );

  const onSaveHandwriting = (data: { json: string; imageData: string }) => {
    setHandwritingData(data.json);
    setHandwritingImage(data.imageData);
  };

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <LabeledTextarea
          label='Front'
          value={frontText}
          onChange={(e) => setFrontText(e.target.value)}
          fontClass={fontClass}
        />
        <LabeledTextarea
          label='Back'
          value={backText}
          onChange={(e) => setBackText(e.target.value)}
          fontClass={fontClass}
        />
        <LabeledTextarea
          label='Phonetic Spelling'
          value={phoneticSpelling}
          onChange={(e) => setPhoneticSpelling(e.target.value)}
          fontClass={fontClass}
        />
        <div className='space-y-2'>
          <Label
            htmlFor='new-handwriting'
            className='text-text-secondary text-sm'
          >
            Handwritten Content
          </Label>
          <div className='space-y-2'>
            <button
              onClick={() => setShowHandwritingCanvas(true)}
              type='button'
              className='border w-full min-h-[80px] border-dashed hover:bg-primary-50 gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer border-neutral-4 hover:border-primary-500 flex items-center justify-center'
            >
              <Pen className='h-4 w-4 mr-1' />
              {handwritingData ? 'Edit' : 'Click to draw'}
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-end space-x-2'>
        <Button variant='ghost' size='sm' onClick={onCancel}>
          <X className='h-4 w-4 mr-1' />
          Cancel
        </Button>
        <Button
          size='sm'
          onClick={() =>
            onSave({
              frontText,
              backText,
              phoneticSpelling,
              handwritingData,
              handwritingImage,
            })
          }
          disabled={
            !frontText.trim().length ||
            !backText.trim().length ||
            isUpdatingCard
          }
        >
          {isUpdatingCard ? (
            <Loader2 className='h-4 w-4 mr-1' />
          ) : (
            <Check className='h-4 w-4 mr-1' />
          )}
          Save Changes
        </Button>
      </div>
      <CanvasModal
        isOpen={showHandwritingCanvas}
        onClose={() => setShowHandwritingCanvas(false)}
        onSave={onSaveHandwriting}
        handwritingData={handwritingData as string | null}
      />
    </div>
  );
};

export default EditCardForm;
