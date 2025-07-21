import { Loader2, Plus, Save } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateCard } from '@/utils/hooks/useApi';
import { getLanguageClasses } from '@/utils/languages';

const cardFields = {
  frontText: {
    label: 'Front',
    value: 'frontText',
    placeholder: 'Enter the question or prompt...',
  },
  backText: {
    label: 'Back',
    value: 'backText',
    placeholder: 'Enter the answer or explanation...',
  },
  phoneticSpelling: {
    label: 'Phonetic Spelling (Optional)',
    value: 'phoneticSpelling',
    placeholder: 'Enter the phonetic spelling...',
  },
};

const CreateNewCard = ({
  deckId,
  deckScript,
}: {
  deckId: string;
  deckScript?: string | null;
}) => {
  const { mutate: createCard, isPending: isCreatingCard } = useCreateCard();
  const [isMissingFields, setIsMissingFields] = useState(false);

  const { fontClass } = getLanguageClasses(deckScript);

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
      },
      {
        onSuccess: () => {
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  };

  return (
    <section>
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
              {Object.values(cardFields).map((field) => (
                <div className='space-y-2' key={field.value}>
                  <Label htmlFor={field.value} className='text-text-secondary'>
                    {field.label}
                  </Label>
                  <Textarea
                    placeholder={field.placeholder}
                    className={`min-h-[100px] resize-none border-neutral-4 focus:border-primary-500 ${fontClass}`}
                    name={field.value}
                    dir='auto'
                  />
                </div>
              ))}
            </div>

            <div
              className={`flex justify-end ${
                isMissingFields ? 'justify-between' : 'justify-end'
              }`}
            >
              {isMissingFields && (
                <div className='text-error text-sm self-center ml-2'>
                  Please fill in all fields.
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
    </section>
  );
};

export default CreateNewCard;
