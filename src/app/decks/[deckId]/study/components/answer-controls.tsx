import { CheckCircle, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

const AnswerControls = ({
  isFlipped,
  handleStudyResult,
}: {
  isFlipped: boolean;
  handleStudyResult: (isCorrect: boolean) => void;
}) => {
  if (!isFlipped) return null;

  return (
    <div className='space-y-4'>
      <div className='text-center'>
        <p className='text-sm text-primary-600 font-medium mb-4'>
          Did you remember this card correctly?
        </p>

        <div className='flex justify-center space-x-4'>
          <Button
            variant='soft-destructive'
            size='sm'
            onClick={() => handleStudyResult(false)}
          >
            <XCircle className='h-5 w-5 mr-1' />
            No
          </Button>

          <Button
            variant='soft-success'
            size='sm'
            onClick={() => handleStudyResult(true)}
          >
            <CheckCircle className='h-5 w-5 mr-1' />
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerControls;
