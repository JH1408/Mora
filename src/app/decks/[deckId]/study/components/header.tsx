import { ArrowLeft, Brain, Eye } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import paths from '@/utils/clientPaths';
import type { StudyMode } from '@/utils/types/studySession';
import { STUDY_MODES } from '@/utils/types/studySession';

// @Josy TODO add some kind of tooltip to explain what recognition and recall are

const Header = ({
  deckName,
  studyMode,
  toggleStudyMode,
  currentCardIndex,
  totalCards,
  endStudySession,
}: {
  deckName?: string;
  studyMode: StudyMode;
  toggleStudyMode: () => void;
  currentCardIndex: number | null;
  totalCards?: number | null;
  endStudySession: () => void;
}) => {
  return (
    <header className='bg-background-white border-b border-neutral-3 shadow-soft sticky top-0 z-40'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-4'>
            <Link href={paths.dashboard} onClick={endStudySession}>
              <Button variant='ghost' size='sm'>
                <ArrowLeft className='h-4 w-4 mr-0 sm:mr-2' />
                <span className='hidden sm:inline'>Back to Dashboard</span>
              </Button>
            </Link>

            <div className='h-6 w-px bg-neutral-3' />
            <div>
              <h1 className='text-xl font-bold font-heading text-text-primary'>
                <span className='hidden sm:inline'>Study Session: </span>
                {deckName}
              </h1>
              {!!totalCards && !!currentCardIndex && (
                <p className='text-sm text-text-muted'>
                  Card {currentCardIndex} of {totalCards}
                </p>
              )}
            </div>
          </div>
          {!!totalCards && !!currentCardIndex && (
            <div className='flex items-center space-x-4'>
              <Button variant='soft' size='sm' onClick={toggleStudyMode}>
                {studyMode === STUDY_MODES.RECOGNITION ? (
                  <Eye className='h-4 w-4 mr-2' />
                ) : (
                  <Brain className='h-4 w-4 mr-2' />
                )}
                {studyMode === STUDY_MODES.RECOGNITION
                  ? 'Recognition'
                  : 'Recall'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
