import { Volume2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StudyCard } from '@/types/deck';
import type { StudyMode } from '@/types/studySession';
import { STUDY_MODES } from '@/types/studySession';

const getCurrentText = (
  isFlipped: boolean,
  studyMode: StudyMode,
  currentCard: StudyCard
) => {
  if (studyMode === STUDY_MODES.RECOGNITION) {
    return isFlipped ? currentCard.backText : currentCard.frontText;
  }
  return isFlipped ? currentCard.frontText : currentCard.backText;
};

const StudyCard = ({
  isFlipped,
  setIsFlipped,
  studyMode,
  currentCard,
  speakText,
  fontClass,
}: {
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
  studyMode: StudyMode;
  currentCard: StudyCard;
  speakText: (text: string) => void;
  fontClass: string;
}) => {
  return (
    <div className='relative'>
      <Card
        className={`min-h-[400px] border-neutral-3 py-6 cursor-pointer transition-all duration-300 ${
          isFlipped ? 'transform rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <CardHeader className='text-center'>
          <CardTitle
            className={`text-lg text-primary-300 ${
              isFlipped ? 'transform rotate-y-180' : ''
            }`}
          >
            {studyMode === STUDY_MODES.RECOGNITION
              ? isFlipped
                ? 'Back'
                : 'Front'
              : isFlipped
              ? 'Front'
              : 'Back'}
          </CardTitle>
        </CardHeader>

        <CardContent className='flex items-center justify-center min-h-[300px]'>
          <div
            className={`text-center space-y-4 transition-all duration-300 ${
              isFlipped ? 'transform rotate-y-180' : ''
            }`}
          >
            <div
              className={`text-4xl font-bold text-text-primary whitespace-pre-wrap ${fontClass}`}
            >
              {getCurrentText(isFlipped, studyMode, currentCard)}
            </div>
            {getCurrentText(isFlipped, studyMode, currentCard) ===
              currentCard.backText && (
              <Button
                variant='soft-secondary'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation();
                  const textToSpeak = getCurrentText(
                    isFlipped,
                    studyMode,
                    currentCard
                  );
                  speakText(textToSpeak);
                }}
              >
                <Volume2 className='h-4 w-4 mr-2' />
                Listen
              </Button>
            )}
          </div>
          {!isFlipped && (
            <div className='text-sm absolute flex items-center justify-center pointer-events-none bottom-6 text-primary-100'>
              Click to reveal answer
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyCard;
