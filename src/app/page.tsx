'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ClientOnly } from '@/components/client-only';
import { Button } from '@/components/ui/button';

import Auth from './auth';

function HomeContent() {
  return (
    <div className='min-h-screen bg-background-light p-8'>
      <div className='w-full flex justify-between items-center'>
        <Image
          src='/images/mora_logo.png'
          alt='Mora Logo'
          width={0}
          height={0}
          sizes='100vw'
          className='h-10 w-auto'
          priority
        />
        <Auth />
      </div>

      <div className='mt-16 text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          Master Any Language with Smart Flashcards
        </h1>
        <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Create personalized flashcard decks, track your progress, and learn
          efficiently with our spaced repetition system.
        </p>
        <Link href='/login'>
          <Button size='lg' className='text-lg px-8 py-4'>
            Get Started
          </Button>
        </Link>
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
