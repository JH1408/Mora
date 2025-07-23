import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import paths from '@/utils/clientPaths';
import { useDeleteDeck, useUpdateDeck } from '@/utils/hooks/useApi';

import DeleteDeck from './delete-deck';

interface HeaderProps {
  deckName?: string;
  deckId: string;
}

const Header = ({ deckName, deckId }: HeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(deckName || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateDeck, isPending: isUpdating } = useUpdateDeck();
  const { mutate: deleteDeck, isPending: isDeleting } = useDeleteDeck();
  const router = useRouter();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (!deckName) return;
    if (!inputValue.trim() || inputValue === deckName) {
      setIsEditing(false);
      setInputValue(deckName);
      return;
    }
    updateDeck(
      { id: deckId, data: { name: inputValue.trim() } },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: () => {
          setInputValue(deckName);
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <header className='bg-background-white border-b border-neutral-3 shadow-soft sticky top-0 z-40'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-4 w-full'>
            <Link href={paths.dashboard}>
              <Button variant='ghost' size='sm'>
                <ArrowLeft className='h-4 w-4 mr-0 sm:mr-2' />
                <span className='hidden sm:inline'>Back to Dashboard</span>
              </Button>
            </Link>

            <div className='h-6 w-px bg-primary-200' />
            <div className='flex justify-between w-full'>
              <div>
                <h1 className='text-xl font-bold font-heading text-text-primary'>
                  Manage Cards
                </h1>
                {deckName && (
                  <p
                    className='text-sm text-text-muted cursor-pointer'
                    onClick={() => setIsEditing(true)}
                  >
                    in{' '}
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        className='text-sm text-text-muted bg-transparent focus:outline-none'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSave();
                          } else if (e.key === 'Escape') {
                            setIsEditing(false);
                            setInputValue(deckName);
                          }
                        }}
                        disabled={isUpdating}
                        autoFocus
                      />
                    ) : (
                      deckName
                    )}
                  </p>
                )}
              </div>
              <DeleteDeck
                onDeleteDeck={() => {
                  deleteDeck(deckId, {
                    onSuccess: () => {
                      router.push(paths.dashboard);
                    },
                  });
                }}
                isDeletingDeck={isDeleting}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
