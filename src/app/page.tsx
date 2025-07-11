'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ClientOnly } from '@/components/client-only';
import paths from '@/utils/paths';
import Image from 'next/image';
import Spinner from '@/components/ui/spinner';

function HomeContent() {
  const { data: session, status } = useSession();

  return (
    <div className='min-h-screen bg-background-light p-8'>
      <div className='w-full flex justify-between items-center'>
        <Image
          src='/images/mora_logo.png'
          alt='Mora Logo'
          width={100}
          height={100}
          className='h-10 w-auto'
        />
        <div className='flex gap-4 justify-center'>
          {status === 'loading' ? (
            <Spinner />
          ) : session ? (
            <div className='flex items-center gap-4'>
              <span className='text-sm text-muted-foreground'>
                Welcome, {session.user?.name}!
              </span>
              <Link href={paths.dashboard}>
                <Button size='lg'>Dashboard</Button>
              </Link>
            </div>
          ) : (
            <>
              <Link href={paths.login}>
                <Button variant='soft' size='lg'>
                  Login
                </Button>
              </Link>
              <Link href={paths.login}>
                <Button size='lg'>Signup</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className='mt-16 text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          Master Any Language with Smart Flashcards
        </h1>
        <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Create personalized flashcard decks, track your progress, and learn
          efficiently with our spaced repetition system.
        </p>
        {!session && (
          <Link href='/login'>
            <Button size='lg' className='text-lg px-8 py-4'>
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ClientOnly
      fallback={
        <div className='min-h-screen bg-background-light p-8'>
          <div className='w-full flex justify-between items-center'>
            <div className='text-2xl font-bold'>Mora</div>
            <div className='flex gap-4 justify-center'>
              <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
            </div>
          </div>
        </div>
      }
    >
      <HomeContent />
    </ClientOnly>
  );
}
