'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import paths from '@/utils/clientPaths';

const RoutePrefetcher = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(paths.dashboard);
    router.prefetch(paths.login);
    router.prefetch(paths.signup);
  }, [router]);

  return null;
};

export default RoutePrefetcher;
