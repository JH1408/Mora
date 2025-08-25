import { describe, it, expect } from 'vitest';

import {
  getLanguageStats,
  formatDifficulty,
  countUniqueLanguages,
} from '../deckUtils';
import type { Deck } from '../schemas';

const createDeck = (overrides: Partial<Deck> = {} as Partial<Deck>): Deck => ({
  id: 'd1',
  name: 'Deck',
  description: null,
  languageId: 'lang-ja',
  language: {
    id: 'lang-ja',
    code: 'ja',
    name: 'Japanese',
    rtl: false,
    ttsSupported: true,
    script: 'Kana',
  },
  userId: 'u1',
  user: { id: 'u1', name: 'User', email: 'user@example.com' },
  difficulty: 'BEGINNER',
  isActive: true,
  cardsCount: 0,
  createdAt: new Date('2025-01-01').toISOString(),
  updatedAt: new Date('2025-01-02').toISOString(),
  ...overrides,
});

describe('deckUtils', () => {
  it('aggregates language stats and sorts by most recent date', () => {
    const decks = [
      createDeck({
        id: 'a',
        languageId: 'lang-ja',
        language: {
          id: 'lang-ja',
          code: 'ja',
          name: 'Japanese',
          rtl: false,
          ttsSupported: true,
          script: 'Kana',
        },
        createdAt: '2025-01-01T00:00:00Z',
      }),
      createDeck({
        id: 'b',
        languageId: 'lang-th',
        language: {
          id: 'lang-th',
          code: 'th',
          name: 'Thai',
          rtl: false,
          ttsSupported: true,
          script: 'Thai',
        },
        createdAt: '2025-01-03T00:00:00Z',
      }),
      createDeck({
        id: 'c',
        languageId: 'lang-ja',
        language: {
          id: 'lang-ja',
          code: 'ja',
          name: 'Japanese',
          rtl: false,
          ttsSupported: true,
          script: 'Kana',
        },
        createdAt: '2025-01-02T00:00:00Z',
      }),
    ];

    const stats = getLanguageStats(decks as Deck[]);
    expect(stats.map((s) => s.code)).toEqual(['th', 'ja']);
    expect(stats[0].deckCount).toBe(1);
    expect(stats[1].deckCount).toBe(2);
  });

  it('counts unique languages', () => {
    const decks: Deck[] = [
      createDeck({
        language: {
          id: 'lang-ja',
          code: 'ja',
          name: 'Japanese',
          rtl: false,
          ttsSupported: true,
        },
      }),
      createDeck({
        language: {
          id: 'lang-th',
          code: 'th',
          name: 'Thai',
          rtl: false,
          ttsSupported: true,
        },
      }),
      createDeck({
        language: {
          id: 'lang-ja',
          code: 'ja',
          name: 'Japanese',
          rtl: false,
          ttsSupported: true,
        },
      }),
    ];
    expect(countUniqueLanguages(decks)).toBe(2);
  });

  it('formats difficulty', () => {
    expect(formatDifficulty('BEGINNER')).toBe('Beginner');
    expect(formatDifficulty('INTERMEDIATE')).toBe('Intermediate');
  });
});
