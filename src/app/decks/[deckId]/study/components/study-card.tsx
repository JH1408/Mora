import { useGesture } from '@use-gesture/react';
import { Volume2 } from 'lucide-react';
import { useState } from 'react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StudyCard } from '@/utils/types/deck';
import type { StudyMode } from '@/utils/types/studySession';
import { STUDY_MODES } from '@/utils/types/studySession';

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

const getCardTitle = (isFlipped: boolean, studyMode: StudyMode) => {
  if (studyMode === STUDY_MODES.RECOGNITION) {
    return isFlipped ? 'Back' : 'Front';
  }
  return isFlipped ? 'Front' : 'Back';
};

const StudyCard = ({
  isFlipped,
  setIsFlipped,
  studyMode,
  currentCard,
  speakText,
  fontClass,
  onSwipeLeft,
  onSwipeRight,
  hasBeenFlipped,
}: {
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
  studyMode: StudyMode;
  currentCard: StudyCard;
  speakText: (text: string) => void;
  fontClass: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  hasBeenFlipped: boolean;
}) => {
  const handleSpeakButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const textToSpeak = getCurrentText(isFlipped, studyMode, currentCard);
    speakText(textToSpeak);
  };

  const [dragOffset, setDragOffset] = useState(0);
  const wasDraggedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const bind = useGesture(
    {
      onDrag: ({
        movement: [mx],
        direction: [xDir],
        velocity: [vx],
        cancel,
        canceled,
        active,
      }) => {
        // Update drag offset for visual feedback
        setDragOffset(mx);
        setIsDragging(active);

        // Check if this was a swipe
        if (canceled) {
          return;
        }

        // Trigger swipe if movement is significant
        if (Math.abs(mx) > 300 && Math.abs(vx) > 0.5) {
          if (xDir > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (xDir < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
          cancel();
        }

        // Mark as dragged if there was significant movement
        if (Math.abs(mx) > 10) {
          wasDraggedRef.current = true;
        }
      },
      onClick: () => {
        if (wasDraggedRef.current) {
          setDragOffset(0);
          wasDraggedRef.current = false;
          setIsDragging(false);
          return;
        }
        setIsFlipped(!isFlipped);
      },
    },
    {
      drag: {
        axis: 'x',
        filterTaps: true,
        bounds: { left: -400, right: 400 },
        rubberband: true,
        enabled: hasBeenFlipped,
      },
    }
  );

  return (
    <div className='relative'>
      <Card
        {...bind()}
        className={`min-h-[400px] border-neutral-3 py-6 cursor-pointer transition-all duration-300 ${
          isFlipped ? 'transform rotate-y-180' : ''
        }`}
        style={{
          transform: `translateX(${dragOffset}px) ${
            isFlipped ? 'rotateY(180deg)' : ''
          }`,
          transition: isDragging ? 'none' : 'all 0.3s ease',
          touchAction: 'none', // Prevent default touch behaviors
        }}
      >
        <CardHeader className='text-center'>
          <CardTitle
            className={`text-lg text-primary-300 ${
              isFlipped ? 'transform rotate-y-180' : ''
            }`}
          >
            {getCardTitle(isFlipped, studyMode)}
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
                onClick={handleSpeakButtonClick}
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
