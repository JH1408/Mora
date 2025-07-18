import Link from 'next/link';

import { Button } from '@/components/ui/button';
import paths from '@/utils/clientPaths';

const PracticeSessionDialog = ({
  startPracticeSession,
}: {
  startPracticeSession: () => void;
}) => {
  return (
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
  );
};

export default PracticeSessionDialog;
