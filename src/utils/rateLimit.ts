// Rate limiter utility with Upstash Redis and
// an in-memory fallback for local dev / single instance.

import { Ratelimit } from '@upstash/ratelimit';
import type { Redis } from '@upstash/redis';
import { Redis as UpstashRedis } from '@upstash/redis';
import { NextResponse } from 'next/server';

type LimitCheckResult = {
  success: boolean;
  remaining: number;
  resetUnixMs: number;
  retryAfterSeconds: number;
};

type LimiterLike = {
  limit: (key: string) => LimitCheckResult | Promise<LimitCheckResult>;
};

class SlidingWindowInMemoryLimiter implements LimiterLike {
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly keyToTimestamps: Map<string, number[]> = new Map();

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  public limit(key: string): LimitCheckResult {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    const timestamps = this.keyToTimestamps.get(key) ?? [];
    // Drop old entries outside the window
    const recent = timestamps.filter((t) => t > windowStart);

    if (recent.length >= this.maxRequests) {
      // Compute when the oldest within window will expire
      const oldest = recent[0];
      const resetUnixMs = oldest + this.windowMs;
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((resetUnixMs - now) / 1000)
      );
      this.keyToTimestamps.set(key, recent);
      return {
        success: false,
        remaining: 0,
        resetUnixMs,
        retryAfterSeconds,
      };
    }

    // Allow and record
    recent.push(now);
    this.keyToTimestamps.set(key, recent);

    return {
      success: true,
      remaining: Math.max(0, this.maxRequests - recent.length),
      resetUnixMs: recent[0] + this.windowMs,
      retryAfterSeconds: 0,
    };
  }
}

class SlidingWindowUpstashLimiter implements LimiterLike {
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly ratelimit: Ratelimit;

  constructor(
    name: string,
    windowMs: number,
    maxRequests: number,
    redis: Redis
  ) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(maxRequests, `${windowMs} ms`),
      prefix: `rl:${name}`,
    });
  }

  public async limit(key: string): Promise<LimitCheckResult> {
    const now = Date.now();
    const result = await this.ratelimit.limit(key);
    const resetUnixSeconds =
      typeof result.reset === 'number'
        ? result.reset
        : Math.ceil(now / 1000) + Math.ceil(this.windowMs / 1000);
    const resetUnixMs = resetUnixSeconds * 1000;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((resetUnixMs - now) / 1000)
    );
    return {
      success: result.success,
      remaining: Math.max(
        0,
        result.remaining ?? Math.max(0, this.maxRequests - 1)
      ),
      resetUnixMs,
      retryAfterSeconds: result.success ? 0 : retryAfterSeconds,
    };
  }
}

const limiterRegistry: Map<string, LimiterLike> = new Map();

export function getLimiter(
  name: string,
  windowMs: number,
  maxRequests: number
) {
  const existing = limiterRegistry.get(name);
  if (existing) return existing;

  const hasUpstash =
    typeof process !== 'undefined' &&
    !!process.env &&
    !!process.env.UPSTASH_REDIS_REST_URL &&
    !!process.env.UPSTASH_REDIS_REST_TOKEN;

  if (hasUpstash) {
    const redis = UpstashRedis.fromEnv();
    const limiter = new SlidingWindowUpstashLimiter(
      name,
      windowMs,
      maxRequests,
      redis
    );
    limiterRegistry.set(name, limiter);
    return limiter;
  }

  const limiter = new SlidingWindowInMemoryLimiter(windowMs, maxRequests);
  limiterRegistry.set(name, limiter);
  return limiter;
}

export type { LimitCheckResult };

export async function checkRateLimit(options: {
  limiterName: string;
  windowMs: number;
  maxRequests: number;
  key: string;
}): Promise<LimitCheckResult> {
  const { limiterName, windowMs, maxRequests, key } = options;
  const limiter = getLimiter(limiterName, windowMs, maxRequests);
  const result = await limiter.limit(key);
  return result as LimitCheckResult;
}

export function build429Response(rate: LimitCheckResult, errorMessage: string) {
  return new NextResponse(JSON.stringify({ error: errorMessage }), {
    status: 429,
    headers: {
      'Content-Type': 'application/json',
      'Retry-After': String(rate.retryAfterSeconds),
      'X-RateLimit-Remaining': String(rate.remaining),
    },
  });
}
