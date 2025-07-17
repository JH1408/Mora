'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Progress } from '@/components/ui/progress';
import Spinner from '@/components/ui/spinner';
import type { StudyMode } from '@/types/studySession';
import {
  useCompleteStudySession,
  useSubmitStudyResult,
  useStudyCards,
} from '@/utils/hooks/useApi';
import { getLanguageClasses } from '@/utils/languages';
import paths from '@/utils/paths';

import AnswerControls from './components/answer-controls';
import Header from './components/header';
import StudyCard from './components/study-card';

const Study = () => {
  const router = useRouter();
  const { deckId } = useParams<{ deckId: string }>();
  // @Josy TODO error handling
  const { data: studySession, isLoading: isLoadingStudySession } =
    useStudyCards(deckId as string);
  const { mutate: submitStudyResult } = useSubmitStudyResult(deckId as string);
  const { mutate: completeStudySession } = useCompleteStudySession(
    deckId as string
  );

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<StudyMode>('recognition');
  const [sessionStats, setSessionStats] = useState({
    studied: 0,
    correct: 0,
    total: studySession?.cards.length,
  });

  const endStudySession = useCallback(() => {
    if (!studySession) return;
    const sessionEnd = new Date();
    const sessionStart = new Date(studySession.studySession.startedAt);
    const sessionDuration = Math.round(
      (sessionEnd.getTime() - sessionStart.getTime()) / 1000
    );
    completeStudySession({
      studySessionId: studySession.studySession.id,
      sessionDuration,
    });
  }, [studySession, completeStudySession]);

  useEffect(() => {
    return () => endStudySession();
  }, [endStudySession]);

  const currentCard = studySession?.cards[currentCardIndex];

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
    if (!currentCard || !studySession) return;

    submitStudyResult(
      {
        cardId: currentCard.id,
        isCorrect,
        studySessionId: studySession.studySession.id,
      }
      // @Josy TODO error handling: we don't want to remove the card from the deck but it should still be studied
      // also if the user didn't remember the card, I want to show it again
      // if the user wants to start a new session, should we show all cards again?
    );

    // Update session stats
    setSessionStats((prev) => ({
      ...prev,
      studied: prev.studied + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }));

    // Move to next card or finish session
    if (studySession && currentCardIndex < studySession.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      toast.success(
        `Session complete! You studied ${sessionStats.studied + 1} cards.`
      );
      endStudySession();
      router.push(paths.dashboard);
    }
  };

  const toggleStudyMode = () => {
    setStudyMode(studyMode === 'recognition' ? 'recall' : 'recognition');
    setIsFlipped(false);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100'>
      <Header
        deckName={studySession?.deck.name}
        studyMode={studyMode}
        toggleStudyMode={toggleStudyMode}
        currentCardIndex={currentCardIndex}
        cards={studySession?.cards}
        endStudySession={endStudySession}
      />
      {isLoadingStudySession && (
        <Spinner className='absolute top-1/2 left-1/2 ' />
      )}
      {studySession && currentCard && (
        <>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
            <Progress
              value={(currentCardIndex / studySession.cards.length) * 100}
              className='h-2'
            />
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
