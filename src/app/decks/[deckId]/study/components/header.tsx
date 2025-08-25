import Link from 'next/link';

import { ArrowLeft, Brain, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Header as BaseHeader,
  HeaderLeft,
  HeaderRight,
  HeaderDivider,
  HeaderTitle,
} from '@/components/ui/header';
import paths from '@/utils/clientPaths';
import type { StudyMode } from '@/utils/types/studySession';
import { STUDY_MODES } from '@/utils/types/studySession';

const Header = ({
  deckName,
  studyMode,
  toggleStudyMode,
  endStudySession,
}: {
  deckName?: string;
  studyMode: StudyMode;
  toggleStudyMode: () => void;
  endStudySession: () => void;
}) => {
  return (
    <BaseHeader maxWidth='4xl'>
      <HeaderLeft className='space-x-4'>
        <Link href={paths.dashboard} onClick={endStudySession}>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-0 sm:mr-2' />
            <span className='hidden sm:inline'>Back to Dashboard</span>
          </Button>
        </Link>

        <HeaderDivider />
        <div>
          <HeaderTitle>
            <span className='hidden sm:inline'>Study Session: </span>
            {deckName}
          </HeaderTitle>
        </div>
      </HeaderLeft>

      <HeaderRight>
        <Button
          variant='soft'
          size='sm'
          onClick={toggleStudyMode}
          className='w-36'
        >
          {studyMode === STUDY_MODES.RECOGNITION ? (
            <Eye className='h-4 w-4 mr-2' />
          ) : (
            <Brain className='h-4 w-4 mr-2' />
          )}
          {studyMode === STUDY_MODES.RECOGNITION
            ? 'Front-to-Back'
            : 'Back-to-Front'}
        </Button>
      </HeaderRight>
    </BaseHeader>
  );
};

export default Header;
