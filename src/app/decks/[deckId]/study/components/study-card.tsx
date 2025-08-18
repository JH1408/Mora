import { useGesture } from '@use-gesture/react';
import { Volume2 } from 'lucide-react';
import Image from 'next/image';
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
        active,
        last,
      }) => {
        // Update drag offset for visual feedback
        setDragOffset(mx);
        setIsDragging(active);

        if (last) {
          // Check if this was a swipe - use different thresholds for mouse vs touch
          const isSwipe =
            Math.abs(mx) > 300 && (Math.abs(vx) > 0.5 || Math.abs(mx) > 400);

          if (isSwipe) {
            if (xDir < 0 && onSwipeRight) {
              onSwipeRight();
            } else if (xDir > 0 && onSwipeLeft) {
              onSwipeLeft();
            }
            // Reset drag offset immediately for swipes
            setDragOffset(0);
          } else {
            // Return to original position if not a swipe
            setDragOffset(0);
          }
          setIsDragging(false);
          // Don't reset wasDraggedRef here - let the onClick handler check it
          return;
        }

        if (Math.abs(mx) > 10) {
          wasDraggedRef.current = true;
        }
      },
      onClick: () => {
        // Only trigger click if there was no drag
        if (wasDraggedRef.current) {
          wasDraggedRef.current = false; // Reset for next interaction
          return;
        }
        setIsFlipped(!isFlipped);
      },
    },
    {
      drag: {
        axis: 'x',
        filterTaps: true,
        bounds: { left: -500, right: 500 },
        rubberband: true,
        enabled: hasBeenFlipped,
        from: () => [dragOffset, 0],
      },
    }
  );

  const shouldShowExtraContent =
    getCurrentText(isFlipped, studyMode, currentCard) === currentCard.backText;

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
          transition: isDragging
            ? 'none'
            : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          touchAction: 'none',
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
          {shouldShowExtraContent && (
            <Button
              variant='soft-secondary'
              size='sm'
              onClick={handleSpeakButtonClick}
              className={`absolute top-4  z-10 ${
                isFlipped ? 'transform rotate-y-180 left-4' : 'right-4'
              }`}
            >
              <Volume2 className='h-4 w-4' />
            </Button>
          )}
        </CardHeader>

        <CardContent className='flex items-center justify-center min-h-[300px]'>
          <div
            className={`text-center space-y-4 transition-all duration-300 mt-[-50px] ${
              isFlipped ? 'transform rotate-y-180' : ''
            }`}
          >
            <div
              className={`text-4xl font-bold text-text-primary whitespace-pre-wrap ${fontClass}`}
            >
              {getCurrentText(isFlipped, studyMode, currentCard)}
            </div>

            {shouldShowExtraContent && currentCard.phoneticSpelling && (
              <div className='text-3xl text-primary-700'>
                {currentCard.phoneticSpelling}
              </div>
            )}
            {shouldShowExtraContent && currentCard.handwritingImage && (
              <div className='w-full max-w-[300px] h-[200px] flex items-center justify-center'>
                <Image
                  src={currentCard.handwritingImage}
                  alt='Handwritten Content'
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='max-w-full max-h-full object-contain w-auto h-auto'
                />
              </div>
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
