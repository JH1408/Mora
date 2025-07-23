'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

import CreateDeckModal from '@/app/dashboard/components/create-deck-modal';
import ErrorMessage from '@/components/error-message';
import Spinner from '@/components/ui/spinner';
import { countUniqueLanguages } from '@/utils/deckUtils';
import { useDecks, useLanguages } from '@/utils/hooks/useApi';

import Decks from './components/decks';
import Header from './components/header';
import NoDecks from './components/no-decks';
import Stats from './components/stats';

export default function DashboardPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    data: decks = [],
    isLoading: isLoadingDecks,
    error: decksError,
  } = useDecks();
  const { data: languages = [] } = useLanguages();

  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      router.push('/login');
    }
  }, [sessionStatus, router]);

  const languagesCount = useMemo(() => countUniqueLanguages(decks), [decks]);
  const deckCount = useMemo(() => decks.length, [decks]);

  if (sessionStatus === 'loading') {
    return (
      <div className='min-h-screen bg-background-light flex items-center justify-center'>
        <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className='h-screen bg-gradient-to-br from-primary-100 to-accent-100 flex flex-col'>
      <Header userName={session.user?.name || null} />
      <main className='flex-1 overflow-y-auto'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <Stats
            setIsCreateModalOpen={setIsCreateModalOpen}
            languagesCount={languagesCount}
            deckCount={deckCount}
          />
          {isLoadingDecks && <Spinner className='absolute top-1/2 left-1/2 ' />}
          <Decks decks={decks} setIsCreateModalOpen={setIsCreateModalOpen} />
          {!decks.length && !isLoadingDecks && (
            <NoDecks setIsCreateModalOpen={setIsCreateModalOpen} />
          )}
          {decksError && (
            <ErrorMessage message="Oops, we couldn't load your decks." />
          )}
        </div>
      </main>
      <CreateDeckModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        languages={languages}
      />
    </div>
  );
}
