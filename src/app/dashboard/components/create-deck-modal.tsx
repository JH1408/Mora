import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface CreateDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDeckModal: React.FC<CreateDeckModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [deckName, setDeckName] = useState('');
  const [language, setLanguage] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!deckName.trim() || !language || !difficulty) {
      toast.error('Please fill in all fields to create your deck.');
      return;
    }

    // Here you would typically save the deck to your backend/state management
    console.log('Creating deck:', { deckName, language, difficulty });

    toast.success(`"${deckName}" has been created successfully.`);

    // Reset form and close modal
    setDeckName('');
    setLanguage('');
    setDifficulty('');
    onClose();
  };

  const handleClose = () => {
    setDeckName('');
    setLanguage('');
    setDifficulty('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md bg-background-white border-neutral-3 shadow-primary'>
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2 font-heading'>
            <div className='bg-primary-100 p-2 rounded-lg'>
              <BookOpen className='h-5 w-5 text-primary-600' />
            </div>
            <span className='text-text-primary'>Create New Deck</span>
          </DialogTitle>
          <DialogDescription className='text-text-muted'>
            Create a new flashcard deck to start building your vocabulary.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
          <div>
            <Label
              htmlFor='deckName'
              className='text-sm font-medium text-text-secondary'
            >
              Deck Name
            </Label>
            <Input
              id='deckName'
              type='text'
              placeholder='e.g., Basic Conversations'
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className='mt-1 border-neutral-4 focus:border-primary-500 focus:ring-primary-500'
            />
          </div>

          <div>
            <Label
              htmlFor='language'
              className='text-sm font-medium text-text-secondary'
            >
              Language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className='mt-1 border-neutral-4 focus:border-primary-500 focus:ring-primary-500'>
                <SelectValue placeholder='Select a language' />
              </SelectTrigger>
              <SelectContent className='bg-background-white border-neutral-3 shadow-primary'>
                <SelectItem value='spanish'>🇪🇸 Spanish</SelectItem>
                <SelectItem value='french'>🇫🇷 French</SelectItem>
                <SelectItem value='german'>🇩🇪 German</SelectItem>
                <SelectItem value='italian'>🇮🇹 Italian</SelectItem>
                <SelectItem value='portuguese'>🇵🇹 Portuguese</SelectItem>
                <SelectItem value='japanese'>🇯🇵 Japanese</SelectItem>
                <SelectItem value='korean'>🇰🇷 Korean</SelectItem>
                <SelectItem value='mandarin'>🇨🇳 Mandarin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor='difficulty'
              className='text-sm font-medium text-text-secondary'
            >
              Difficulty Level
            </Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className='mt-1 border-neutral-4 focus:border-primary-500 focus:ring-primary-500'>
                <SelectValue placeholder='Select difficulty' />
              </SelectTrigger>
              <SelectContent className='bg-background-white border-neutral-3 shadow-primary'>
                <SelectItem value='beginner'>Beginner</SelectItem>
                <SelectItem value='intermediate'>Intermediate</SelectItem>
                <SelectItem value='advanced'>Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex space-x-3 pt-4'>
            <Button
              type='button'
              variant='ghost'
              onClick={handleClose}
              className='flex-1'
            >
              Cancel
            </Button>
            <Button type='submit' className='flex-1'>
              Create Deck
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeckModal;
