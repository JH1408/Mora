'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className='mt-16 sm:mt-20  px-4 sm:px-6 lg:px-8 text-center'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-hero font-semibold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent'>
          A Flashcard App That Speaks Your Language
        </h1>

        <p className='text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-relaxed text-muted-foreground mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 sm:px-6 md:px-8'>
          Mora lets you study using handwriting, audio and spaced repitition.
          Modern, intuitive, and built to support every script — not just Latin
          ones.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center'>
          <Link href='/login' className='w-full sm:w-auto'>
            <Button
              variant='gradient'
              size='xl-3'
              className='w-full sm:w-auto text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg px-6 sm:px-8 md:px-8 lg:px-8 xl:px-8 py-3 sm:py-4 md:py-4 lg:py-4 xl:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200'
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
