'use client';

import Image from 'next/image';

import { useScrollThreshold } from '../utils/hooks/useScrollThreshold';

import Auth from './_home/auth';
import CtaSection from './_home/cta-section';
import Footer from './_home/footer';
import Hero from './_home/hero';
import KeyFeatures from './_home/key-features';

export default function Home() {
  const hasScrolled = useScrollThreshold(50);

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100'>
      <div
        className={`sticky top-0 z-50 w-full flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
          hasScrolled
            ? 'bg-accent-100/50 backdrop-blur-md border-b border-primary-200/50'
            : 'bg-transparent'
        }`}
      >
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

      <div className='px-4 sm:px-6 lg:px-8 pt-8'>
        <Hero />
        <KeyFeatures />
        <CtaSection />
      </div>
      <Footer />
    </div>
  );
}
