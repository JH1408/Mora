'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useSession } from 'next-auth/react';

import Spinner from './ui/spinner';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  const shouldRedirect = useMemo(() => status === 'unauthenticated', [status]);

  useEffect(() => {
    if (shouldRedirect) {
      router.replace('/login');
    }
  }, [shouldRedirect, router]);

  // Show loading only when actually loading, not when redirecting
  if (status === 'loading') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  // Don't render anything while redirecting
  if (shouldRedirect) return null;

  return <>{children}</>;
};

export default RequireAuth;
