'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import paths from '@/utils/clientPaths';

import AuthScreenPresenter from './auth-screen.presenter';

const AuthScreen = ({ isSignUp = false }: { isSignUp?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if user is returning from OAuth
  const error = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl');

  useEffect(() => {
    if (status === 'authenticated' && session) {
      // If there's a callback URL, use it, otherwise go to dashboard
      const redirectTo = callbackUrl || paths.dashboard;
      router.push(redirectTo);
    }
  }, [session, status, router, callbackUrl]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Use the default OAuth flow but with better error handling
      await signIn('google', {
        callbackUrl: paths.dashboard,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  return (
    <AuthScreenPresenter
      isSignUp={isSignUp}
      error={error}
      isLoading={isLoading}
      handleGoogleSignIn={handleGoogleSignIn}
      status={status}
    />
  );
};

export default AuthScreen;
