'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Progress } from '@/components/ui/progress';
import Spinner from '@/components/ui/spinner';
import paths from '@/utils/clientPaths';
import {
  useCompleteStudySession,
  useDeck,
  useSubmitStudyResult,
  useStudyCards,
} from '@/utils/hooks/useApi';
import { useNetworkStatus } from '@/utils/hooks/useNetworkStatus';
import { getLanguageClasses } from '@/utils/languages';
import type { StudyCard as StudyCardType } from '@/utils/types/deck';
import type { StudyMode } from '@/utils/types/studySession';
import { STUDY_MODES } from '@/utils/types/studySession';

import AnswerControls from './components/answer-controls';
import Header from './components/header';
import PracticeSessionDialog from './components/practice-session-dialog';
import StudyCard from './components/study-card';

// @Josy: progress display is wrong when in free practice mode
const Study = () => {
  useNetworkStatus();
  const router = useRouter();
  const { deckId } = useParams<{ deckId: string }>();
  const {
    data: studySession,
    isLoading: isLoadingStudySession,
    isError: isErrorStudySession,
  } = useStudyCards(deckId as string);
  const {
    data: deck,
    isLoading: isLoadingDeck,
    isError: isErrorLoadingDeck,
  } = useDeck(deckId as string);
  const { mutate: completeStudySession } = useCompleteStudySession(
    deckId as string
  );
  const { mutate: submitStudyResult } = useSubmitStudyResult(deckId as string);

  const [cardQueue, setCardQueue] = useState<StudyCardType[] | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<StudyMode>(
    STUDY_MODES.RECOGNITION
  );

  const isPracticeSession = useMemo(
    () => studySession && studySession.totalDue === 0,
    [studySession]
  );
  const currentCard = cardQueue?.[0];

  const initializeStudySession = (cards: StudyCardType[]) => {
    setCardQueue([...cards]);
    setIsFlipped(false);
    setHasBeenFlipped(false);
  };

  useEffect(() => {
    if (studySession?.cards.length) {
      initializeStudySession(studySession.cards);
    }
  }, [studySession]);

  const endStudySession = () => {
    if (!studySession || isPracticeSession) return;
    const sessionEnd = new Date();
    const sessionStart = new Date(studySession.studySession.startedAt);
    const sessionDuration = Math.round(
      (sessionEnd.getTime() - sessionStart.getTime()) / 1000
    );
    completeStudySession({
      studySessionId: studySession.studySession.id,
      sessionDuration,
    });
    const studiedCards = getTotalCards() - (cardQueue?.length || 0);
    toast.success(`Session complete! You studied ${studiedCards} cards.`);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && studySession) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = studySession.deck.language.code;
      utterance.rate = 1;
      speechSynthesis.speak(utterance);
    } else {
      toast.error('Text-to-speech is not supported in your browser');
    }
  };

  const handleStudyResult = (isCorrect: boolean) => {
    if (!currentCard || !studySession || cardQueue?.length === 0 || !cardQueue)
      return;
    const cardToProcess = cardQueue[0];
    // Optimistically update queue
    setCardQueue((prevQueue) => {
      if (!prevQueue || prevQueue.length === 0) return prevQueue;
      const [first, ...rest] = prevQueue;
      if (isCorrect) {
        // Remove the card from the queue
        return rest;
      } else {
        // Move the card to the end of the queue
        return [...rest, first];
      }
    });
    setIsFlipped(false);
    setHasBeenFlipped(false);
    // Only submit study result if this is NOT a practice session
    if (!isPracticeSession) {
      submitStudyResult(
        {
          cardId: currentCard.id,
          isCorrect,
          studySessionId: studySession.studySession.id,
        },
        {
          onError: () => {
            setCardQueue((prevQueue) =>
              prevQueue ? [...prevQueue, cardToProcess] : [cardToProcess]
            );
          },
        }
      );
    }
    if (cardQueue?.length === 1) {
      endStudySession();
      router.push(paths.dashboard);
    }
  };

  const handleSetIsFlipped = (flipped: boolean) => {
    setIsFlipped(flipped);
    if (flipped) {
      setHasBeenFlipped(true);
    }
  };

  const toggleStudyMode = () => {
    setStudyMode(
      studyMode === STUDY_MODES.RECOGNITION
        ? STUDY_MODES.RECALL
        : STUDY_MODES.RECOGNITION
    );
    setIsFlipped(false);
    setHasBeenFlipped(false);
  };

  const startPracticeSession = () => {
    if (!deck) return;
    initializeStudySession(deck.cards as StudyCardType[]);
  };

  const calculateProgressPercentage = () => {
    const cards = isPracticeSession ? deck?.cards : studySession?.cards;
    if (!cards || !cardQueue) return 0;
    return ((cards.length - cardQueue.length) / cards.length) * 100;
  };

  const getCurrentCardIndex = () => {
    const cards = isPracticeSession ? deck?.cards : studySession?.cards;
    if (!cards || !cardQueue) return 0;
    return cards.findIndex((card) => card.id === cardQueue[0]?.id) + 1;
  };

  const getTotalCards = useCallback(() => {
    if (isPracticeSession) return deck?.cards?.length || 0;
    return studySession?.cards.length || 0;
  }, [isPracticeSession, deck, studySession]);

  const shouldShowPracticeSessionDialog =
    isPracticeSession && deck?.cards && !cardQueue;
  const shouldShowStudyCard =
    studySession && currentCard && cardQueue.length > 0;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      endStudySession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100'>
      <Header
        deckName={isPracticeSession ? deck?.name : studySession?.deck.name}
        studyMode={studyMode}
        toggleStudyMode={toggleStudyMode}
        currentCardIndex={cardQueue ? getCurrentCardIndex() : null}
        totalCards={getTotalCards()}
        endStudySession={endStudySession}
      />
      {(isLoadingStudySession || (isLoadingDeck && isPracticeSession)) && (
        <Spinner className='absolute top-1/2 left-1/2 ' />
      )}
      {(isErrorStudySession || (isErrorLoadingDeck && isPracticeSession)) && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <p className='text-error text-center'>
            Oops, we couldn&apos;t load your study session. <br />
            Please refresh the page to try again.
          </p>
        </div>
      )}
      {shouldShowPracticeSessionDialog && (
        <PracticeSessionDialog startPracticeSession={startPracticeSession} />
      )}
      {shouldShowStudyCard && (
        <>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
            <Progress value={calculateProgressPercentage()} className='h-2' />
          </div>

          <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='space-y-6'>
              <StudyCard
                isFlipped={isFlipped}
                setIsFlipped={handleSetIsFlipped}
                studyMode={studyMode}
                currentCard={currentCard}
                speakText={speakText}
                fontClass={
                  getLanguageClasses(studySession?.deck.language.script)
                    .fontClass
                }
                hasBeenFlipped={hasBeenFlipped}
                onSwipeLeft={() => handleStudyResult(false)}
                onSwipeRight={() => handleStudyResult(true)}
              />
              <AnswerControls
                hasBeenFlipped={hasBeenFlipped}
                handleStudyResult={handleStudyResult}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Study;
