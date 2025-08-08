import { Loader2, Pen, Plus, Save } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateCard } from '@/utils/hooks/useApi';
import { getLanguageClasses } from '@/utils/languages';
import { cardFields } from '@/utils/utils';

import CanvasModal from './canvas-modal';

const CreateNewCard = ({
  deckId,
  deckScript,
}: {
  deckId: string;
  deckScript?: string | null;
}) => {
  const { mutate: createCard, isPending: isCreatingCard } = useCreateCard();
  const [isMissingFields, setIsMissingFields] = useState(false);
  const [showHandwritingCanvas, setShowHandwritingCanvas] = useState(false);
  const [handwritingData, setHandwritingData] = useState<string | null>(null);
  const [handwritingImage, setHandwritingImage] = useState<string | null>(null);
  const { fontClass } = getLanguageClasses(deckScript);

  const onSaveHandwriting = (data: { json: string; imageData: string }) => {
    setHandwritingData(data.json);
    setHandwritingImage(data.imageData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsMissingFields(false);
    const formData = new FormData(e.target as HTMLFormElement);
    const frontText = formData.get('frontText') as string;
    const backText = formData.get('backText') as string;
    const phoneticSpelling = formData.get('phoneticSpelling');
    if (!frontText.trim().length || !backText.trim().length) {
      setIsMissingFields(true);
      return;
    }
    createCard(
      {
        deckId,
        frontText,
        backText,
        phoneticSpelling: phoneticSpelling
          ? (phoneticSpelling as string)
          : undefined,
        handwritingData: handwritingData ?? undefined,
        handwritingImage: handwritingImage ?? undefined,
      },
      {
        onSuccess: () => {
          (e.target as HTMLFormElement).reset();
          setHandwritingData(null);
          setHandwritingImage(null);
        },
      }
    );
  };

  return (
    <section className='my-2'>
      <h2 className='text-2xl font-bold font-heading text-text-primary py-6'>
        Create New Card
      </h2>

      <Card className='hover:shadow-primary py-6 transition-shadow duration-200 border-neutral-3'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Plus className='h-4 w-4 mr-2' />
            Add New Card
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              {cardFields.map((field) => {
                if (field.value === null) {
                  return (
                    <div className='space-y-2' key={field.label + 'create'}>
                      <Label
                        htmlFor='new-handwriting'
                        className='text-text-secondary'
                      >
                        Handwritten Content
                        <span className='text-text-muted'>(optional)</span>
                      </Label>
                      <div className='space-y-2'>
                        <button
                          onClick={() => setShowHandwritingCanvas(true)}
                          type='button'
                          className='border w-full min-h-[100px] border-dashed hover:bg-primary-50 gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer border-neutral-4 hover:border-primary-500 flex items-center justify-center'
                        >
                          <Pen className='h-4 w-4 mr-1' />
                          {handwritingData ? 'Edit' : 'Click to draw'}
                        </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className='space-y-2' key={field.value + 'create'}>
                    <Label
                      htmlFor={field.value}
                      className='text-text-secondary'
                    >
                      {field.label}{' '}
                      {field.value === 'phoneticSpelling' && (
                        <span className='text-text-muted'>(optional)</span>
                      )}
                    </Label>
                    <Textarea
                      placeholder={field.placeholder}
                      className={`min-h-[100px] resize-none border-neutral-4 focus:border-primary-500 ${fontClass}`}
                      name={field.value}
                      dir='auto'
                    />
                  </div>
                );
              })}
            </div>

            <div
              className={`flex justify-end ${
                isMissingFields ? 'justify-between' : 'justify-end'
              }`}
            >
              {isMissingFields && (
                <div className='text-error text-sm self-center mr-4'>
                  Please fill in all mandatory fields.
                </div>
              )}
              <Button type='submit' disabled={isCreatingCard}>
                {isCreatingCard ? (
                  <Loader2 className='h-4 w-4 mr-2' />
                ) : (
                  <Save className='h-4 w-4 mr-2' />
                )}
                Save Card
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <CanvasModal
        isOpen={showHandwritingCanvas}
        onClose={() => setShowHandwritingCanvas(false)}
        onSave={onSaveHandwriting}
        handwritingData={handwritingData}
      />
    </section>
  );
};

export default CreateNewCard;
