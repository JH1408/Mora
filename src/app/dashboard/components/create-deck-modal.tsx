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
import { Language } from '@/lib/api';
import { useCreateDeck } from '@/utils/hooks/useApi';
import { Difficulty, DIFFICULTY_OPTIONS } from '@/types/deck';
import Spinner from '@/components/ui/spinner';
import LanguageFlag from '@/components/language-flag';

interface CreateDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  languages: Language[];
}

const CreateDeckModal: React.FC<CreateDeckModalProps> = ({
  isOpen,
  onClose,
  languages,
}) => {
  const [deckName, setDeckName] = useState('');
  const [language, setLanguage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const {
    mutate: createDeck,
    isPending: isCreatingDeck,
    isError: isCreateDeckError,
  } = useCreateDeck();
  console.log({ isCreateDeckError, isCreatingDeck });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!deckName.trim() || !language || !difficulty) {
      toast.error('Please fill in all fields to create your deck.');
      return;
    }

    createDeck(
      {
        name: deckName,
        languageId: language,
        difficulty: difficulty as Difficulty,
      },
      {
        onSuccess: () => {
          setDeckName('');
          setLanguage('');
          setDifficulty('');
          onClose();
        },
      }
    );
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
              <SelectTrigger className='w-full mt-1 border-neutral-4 focus:border-primary-500 focus:ring-primary-500'>
                <SelectValue placeholder='Select a language' />
              </SelectTrigger>
              <SelectContent className='bg-background-white border-neutral-3 shadow-primary'>
                {languages.map((language) => (
                  <SelectItem
                    key={language.id}
                    value={language.id}
                    className='w-full'
                  >
                    <div className='flex items-center space-x-2 w-full py-1'>
                      <LanguageFlag languageCode={language.code} size={20} />
                      <span className='px-2'>{language.name}</span>
                    </div>
                  </SelectItem>
                ))}
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
              <SelectTrigger className='mt-1 w-full border-neutral-4 focus:border-primary-500 focus:ring-primary-500'>
                <SelectValue placeholder='Select difficulty' />
              </SelectTrigger>
              <SelectContent className='bg-background-white border-neutral-3 shadow-primary'>
                {DIFFICULTY_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className='w-full'
                  >
                    <span className='px-2 py-1 block'>{option.label}</span>
                  </SelectItem>
                ))}
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
            <Button type='submit' className='flex-1' disabled={isCreatingDeck}>
              {isCreatingDeck ? (
                <Spinner className='w-4 h-4 border-white' />
              ) : (
                'Create Deck'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeckModal;
