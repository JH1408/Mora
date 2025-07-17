import NextAuth from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';

export const sessionUserSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export const sessionSchema = z.object({
  user: sessionUserSchema.optional(),
  expires: z.string().optional(),
});
export type Session = z.infer<typeof sessionSchema>;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
