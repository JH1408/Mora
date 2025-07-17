import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import {
  languageSchema,
  languagesSchema,
  type Language,
  type Languages,
} from '@/lib/schemas';

// Re-export for backward compatibility
export { languageSchema, languagesSchema };
export type { Language, Languages };

export async function GET() {
  try {
    // Get all languages, ordered by name
    const languages = await prisma.language.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
