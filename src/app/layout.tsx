import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import './globals.css';
import { Providers } from '@/components/providers';
import RoutePrefetcher from '@/components/route-prefetcher';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

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
      <body
        className={`${inter.className} ${playfair.variable}`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <RoutePrefetcher />
          <VercelAnalytics />
          <ReactQueryDevtools />
          {children}
        </Providers>
      </body>
    </html>
  );
}
