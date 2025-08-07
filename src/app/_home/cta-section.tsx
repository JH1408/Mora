'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className='pb-30 px-4 md:px-8 max-w-4xl mx-auto text-center'>
      <div className='relative z-10'>
        <h2 className='text-4xl md:text-5xl font-hero mb-8 text-text-primary leading-tight'>
          Learning a new language is hard. <br />
          <span className='bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent'>
            Mora makes it easier
          </span>
        </h2>

        <div className='space-y-6 mb-12'>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            No clutter. No ads. Just a tool that works.
          </p>

          <p className='text-lg text-text-secondary'>
            Built by language learners, for language learners.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Link href='/signup'>
            <Button
              variant='gradient'
              size='xl-3'
              className='text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200'
            >
              Start Learning Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
