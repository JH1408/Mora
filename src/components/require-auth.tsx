'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Spinner from './ui/spinner';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }
  if (status === 'unauthenticated') return null;

  return <>{children}</>;
};

export default RequireAuth;
