'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
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
  );
};

export default Auth;
