'use client';

import Image from 'next/image';
import Link from 'next/link';

const LogoLink = () => {
  return (
    <div className='px-4 sm:px-6 lg:px-8 py-6'>
      <Link href='/'>
        <Image
          src='/images/mora_logo.png'
          alt='Mora Logo'
          width={0}
          height={0}
          sizes='100vw'
          className='h-10 w-auto'
          priority
        />
      </Link>
    </div>
  );
};

export default LogoLink;
