'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import paths from '@/utils/clientPaths';

const signUpText = {
  title: 'Welcome to Mora',
  description: 'Create a free account to start learning',
  loadingText: 'Creating your account...',
  termsText:
    'By creating an account, you agree to our Terms of Service and Privacy Policy.',
  errorText: 'Oops, we could not create your account. Please try again.',
  rerouteText: 'Already have an account?',
  rerouteLink: paths.login,
};

const signInText = {
  title: 'Welcome Back to Mora',
  description: 'Sign in to your account to continue learning',
  loadingText: 'Signing in...',
  termsText:
    'By signing in, you agree to our Terms of Service and Privacy Policy.',
  errorText: 'Oops, we could not sign you in. Please try again.',
  rerouteText: "Don't have an account yet?",
  rerouteLink: paths.signup,
};

const RerouteText = ({ isSignUp }: { isSignUp: boolean }) => {
  return (
    <div className='text-center text-sm text-muted-foreground'>
      {isSignUp ? signUpText.rerouteText : signInText.rerouteText}{' '}
      <Link
        href={isSignUp ? paths.login : paths.signup}
        className='text-primary-500'
      >
        {isSignUp ? 'Sign in' : 'Sign up'}
      </Link>
    </div>
  );
};

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

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className='min-h-screen bg-background-light flex items-center justify-center p-4'>
        <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  // Don't show login page if already authenticated
  if (status === 'authenticated') {
    return (
      <div className='min-h-screen bg-background-light flex items-center justify-center p-4'>
        <div className='text-center'>
          <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background-light'>
      <div className='absolute top-6 left-6'>
        <Link href='/'>
          <Image
            src='/images/mora_logo.png'
            alt='Mora Logo'
            width={100}
            height={100}
            className='h-10 w-auto'
            priority
          />
        </Link>
      </div>
      <div className='flex items-center justify-center p-4 min-h-screen'>
        <Card
          className='w-full max-w-md py-10 border-0'
          style={{
            boxShadow: '0 12px 80px 8px rgba(89,63,98,0.32)',
          }}
        >
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold'>
              {isSignUp ? signUpText.title : signInText.title}
            </CardTitle>
            <CardDescription>
              {isSignUp ? signUpText.description : signInText.description}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 px-16'>
            {error && (
              <div className='p-3 bg-red-50 border border-red-200 rounded-md text-warning-600 text-sm'>
                {isSignUp ? signUpText.errorText : signInText.errorText}
              </div>
            )}

            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className='w-full'
              size='lg'
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  {isSignUp ? signUpText.loadingText : signInText.loadingText}
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <svg className='w-5 h-5' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='currentColor'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='currentColor'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    />
                    <path
                      fill='currentColor'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                  Continue with Google
                </div>
              )}
            </Button>

            <div className='text-center text-sm text-muted-foreground'>
              {isSignUp ? signUpText.termsText : signInText.termsText}
            </div>

            <RerouteText isSignUp={isSignUp} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
