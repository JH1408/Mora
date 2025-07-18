'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Spinner from '@/components/ui/spinner';
import type { StudyCard as StudyCardType } from '@/types/deck';
import type { StudyMode } from '@/types/studySession';
import { STUDY_MODES } from '@/types/studySession';
import {
  useCompleteStudySession,
  useDeck,
  useSubmitStudyResult,
  useStudyCards,
} from '@/utils/hooks/useApi';
import useOnUnmount from '@/utils/hooks/useOnUnmount';
import { getLanguageClasses } from '@/utils/languages';
import paths from '@/utils/paths';

import AnswerControls from './components/answer-controls';
import Header from './components/header';
import StudyCard from './components/study-card';

const Study = () => {
  const router = useRouter();
  const { deckId } = useParams<{ deckId: string }>();
  const {
    data: studySession,
    isLoading: isLoadingStudySession,
    isError: isErrorStudySession,
  } = useStudyCards(deckId as string);
  const { data: deck, isLoading: isLoadingDeck } = useDeck(deckId as string);
  const { mutate: completeStudySession } = useCompleteStudySession(
    deckId as string
  );

  const [cardQueue, setCardQueue] = useState<StudyCardType[] | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<StudyMode>(
    STUDY_MODES.RECOGNITION
  );
  const [sessionStats, setSessionStats] = useState({
    studied: 0,
    correct: 0,
    total: studySession?.cards.length,
  });

  const isPracticeSession = studySession && studySession.totalDue === 0;

  const initializeStudySession = (cards: StudyCardType[]) => {
    setCardQueue([...cards]);
    setSessionStats({
      studied: 0,
      correct: 0,
      total: cards.length,
    });
    setIsFlipped(false);
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
    toast.success(
      `Session complete! You studied ${sessionStats.studied} cards.`
    );
  };

  useOnUnmount(endStudySession, []);

  // Get the current card index and card
  const currentCard = cardQueue?.[0];

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

  const { mutate: submitStudyResult } = useSubmitStudyResult(deckId as string);

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
      router.push(paths.dashboard);
    }
  };

  const toggleStudyMode = () => {
    setStudyMode(
      studyMode === STUDY_MODES.RECOGNITION
        ? STUDY_MODES.RECALL
        : STUDY_MODES.RECOGNITION
    );
    setIsFlipped(false);
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

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100'>
      <Header
        deckName={isPracticeSession ? deck?.name : studySession?.deck.name}
        studyMode={studyMode}
        toggleStudyMode={toggleStudyMode}
        currentCardIndex={cardQueue ? getCurrentCardIndex() : null}
        totalCards={
          cardQueue && isPracticeSession
            ? deck?.cards?.length
            : cardQueue
            ? studySession?.cards.length
            : null
        }
        endStudySession={endStudySession}
      />
      {isLoadingStudySession && (
        <Spinner className='absolute top-1/2 left-1/2 ' />
      )}
      {isErrorStudySession && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <p className='text-error text-center'>
            Oops, we couldn&apos;t load your study session. <br />
            Please refresh the page to try again.
          </p>
        </div>
      )}
      {isPracticeSession && deck?.cards && !cardQueue && (
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='bg-gradient-to-br from-accent-100 to-accent-50 shadow-soft rounded-lg p-4 m-4'>
            <div className='mx-auto text-center mt-2'>
              <h3 className='text-lg font-medium text-accent-900'>
                Practice Session
              </h3>
              <p className='mt-2 text-sm text-accent-800 text-center'>
                All cards are up to date! Do you want to start a free practice
                session without affecting your progress?
              </p>
            </div>
            <div className='flex justify-center gap-2 mt-6 mb-4'>
              <Button variant='soft-secondary' onClick={startPracticeSession}>
                Start Practice Session
              </Button>
              <Link href={paths.dashboard}>
                <Button variant='ghost'>No, thanks.</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {studySession && currentCard && cardQueue.length > 0 && (
        <>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
            <Progress value={calculateProgressPercentage()} className='h-2' />
          </div>

          <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='space-y-6'>
              <StudyCard
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
                studyMode={studyMode}
                currentCard={currentCard}
                speakText={speakText}
                fontClass={
                  getLanguageClasses(studySession?.deck.language.script)
                    .fontClass
                }
              />
              <AnswerControls
                isFlipped={isFlipped}
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
