import { NextRequest, NextResponse } from 'next/server';

import { getLimiter } from '@/utils/rateLimit';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate-limit auth endpoints to mitigate account creation abuse
  if (pathname.startsWith('/api/auth/')) {
    const ipHeader =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip');
    const ip = ipHeader?.split(',')[0]?.trim() || 'unknown';

    // Stricter limits for account creation flows
    const perMinuteLimiter = getLimiter('auth-routes-per-ip-1m-5', 60_000, 5);
    const perMinute = await perMinuteLimiter.limit(`auth:1m:${ip}`);
    if (!perMinute.success) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many auth requests. Please try again soon.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(perMinute.retryAfterSeconds),
            'X-RateLimit-Remaining': String(perMinute.remaining),
          },
        }
      );
    }

    const perDayLimiter = getLimiter(
      'auth-routes-per-ip-1d-50',
      86_400_000,
      50
    );
    const perDay = await perDayLimiter.limit(`auth:1d:${ip}`);
    if (!perDay.success) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many auth requests today. Please try again tomorrow.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(perDay.retryAfterSeconds),
            'X-RateLimit-Remaining': String(perDay.remaining),
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/auth/:path*'],
};
