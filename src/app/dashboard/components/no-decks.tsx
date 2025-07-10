import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';

const NoDecks = ({
  setIsCreateModalOpen,
}: {
  setIsCreateModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className='text-center py-12'>
      <BookOpen className='mx-auto h-12 w-12 text-neutral-6 mb-4' />
      <h3 className='text-lg font-medium font-heading text-text-primary mb-2'>
        No flashcard decks yet
      </h3>
      <p className='text-text-muted mb-6'>
        Create your first deck to start learning!
      </p>
      <Button
        onClick={() => setIsCreateModalOpen(true)}
        className='bg-primary-600 hover:bg-primary-700 text-white'
      >
        <Plus className='h-4 w-4 mr-2' />
        Create Your First Deck
      </Button>
    </div>
  );
};

export default NoDecks;
