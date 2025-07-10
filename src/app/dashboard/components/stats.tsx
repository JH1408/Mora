import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Plus } from 'lucide-react';

const Stats = ({
  setIsCreateModalOpen,
}: {
  setIsCreateModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
      <Card className='bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-secondary border-0'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-primary-100'>Total Decks</p>
              <p className='text-3xl font-bold font-heading'>3</p>
            </div>
            <BookOpen className='h-8 w-8 text-primary-200' />
          </div>
        </CardContent>
      </Card>

      <Card className='bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-primary border-0'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-primary-100 text-sm'>Create New Deck</p>
              <p className='text-lg font-medium'>Start Learning Today</p>
            </div>
            <Plus className='h-6 w-6 text-primary-200' />
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            size='sm'
            className='mt-3 w-full bg-white/20 hover:bg-white/30 text-white border-0'
          >
            Create Deck
          </Button>
        </CardContent>
      </Card>

      <Card className='bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-accent border-0'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-accent-100'>Languages</p>
              <p className='text-3xl font-bold font-heading'>{3}</p>
            </div>
            <div className='h-8 w-8 text-accent-200 text-xl font-bold'>🌍</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
