import { ArrowLeft, Brain, Eye } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { StudyCard } from '@/types/deck';
import paths from '@/utils/paths';

// @Josy TODO add some kind of tooltip to explain what recognition and recall are

const Header = ({
  deckName,
  studyMode,
  toggleStudyMode,
  currentCardIndex,
  cards,
  endStudySession,
}: {
  deckName?: string;
  studyMode: 'recognition' | 'recall';
  toggleStudyMode: () => void;
  currentCardIndex: number;
  cards?: StudyCard[];
  endStudySession: () => void;
}) => {
  return (
    <header className='bg-background-white border-b border-neutral-3 shadow-soft sticky top-0 z-40'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-4'>
            <Link href={paths.dashboard} onClick={endStudySession}>
              <Button variant='ghost' size='sm'>
                <ArrowLeft className='h-4 w-4 mr-2' />
                Back to Dashboard
              </Button>
            </Link>

            <div className='h-6 w-px bg-neutral-3' />
            <div>
              <h1 className='text-xl font-bold font-heading text-text-primary'>
                Study Session: {deckName}
              </h1>
              {cards && (
                <p className='text-sm text-text-muted'>
                  Card {currentCardIndex + 1} of {cards.length}
                </p>
              )}
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button variant='soft' size='sm' onClick={toggleStudyMode}>
              {studyMode === 'recognition' ? (
                <Eye className='h-4 w-4 mr-2' />
              ) : (
                <Brain className='h-4 w-4 mr-2' />
              )}
              {studyMode === 'recognition' ? 'Recognition' : 'Recall'}
            </Button>

            {/* <div className='text-sm text-text-secondary'>
                        {sessionStats.correct}/{sessionStats.studied} correct
                    </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
