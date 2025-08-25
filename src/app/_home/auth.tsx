'use client';

import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { StaticButton } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import paths from '@/utils/clientPaths';

const Auth = () => {
  const { data: session, status } = useSession();

  return (
    <div className='flex gap-4 justify-center'>
      {status === 'loading' ? (
        <Spinner />
      ) : session ? (
        <div className='flex items-center gap-4'>
          <span className='hidden sm:block text-sm text-muted-foreground'>
            Welcome, {session.user?.name}!
          </span>
          <Link href={paths.dashboard}>
            <StaticButton size='lg'>Dashboard</StaticButton>
          </Link>
        </div>
      ) : (
        <>
          <Link href={paths.login}>
            <StaticButton variant='soft' size='lg'>
              Login
            </StaticButton>
          </Link>
          <Link href={paths.signup}>
            <StaticButton size='lg'>Signup</StaticButton>
          </Link>
        </>
      )}
    </div>
  );
};

export default Auth;
