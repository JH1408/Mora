import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Providers } from '@/components/providers';
import RoutePrefetcher from '@/components/route-prefetcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mora',
  description: 'Learn a new language, one card at a time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <RoutePrefetcher />
          {children}
        </Providers>
      </body>
    </html>
  );
}
