'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import CreateDeckModal from '@/app/dashboard/components/create-deck-modal';
import Header from './components/header';
import Decks from './components/decks';
import NoDecks from './components/no-decks';
import { mockDecks } from './mockData';
import Stats from './components/stats';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  console.log({ session, status });
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
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
    <div className='h-screen bg-gradient-to-br from-primary-50 via-background-white to-accent-50 flex flex-col'>
      <Header userName={session.user?.name || null} />
      <main className='flex-1 overflow-y-auto'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <Stats setIsCreateModalOpen={setIsCreateModalOpen} />
          <Decks />
          {mockDecks.length === 0 && (
            <NoDecks setIsCreateModalOpen={setIsCreateModalOpen} />
          )}
        </div>
      </main>

      <div className='fixed bottom-6 right-6 z-50'>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          size='lg'
          className='rounded-full w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white shadow-primary hover:shadow-lg transition-all duration-200'
        >
          <Plus className='h-6 w-6' />
        </Button>
      </div>
      <CreateDeckModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
