import { Deck, DeckWithCardCount, Difficulty } from '@/types/deck';

interface LanguageStats {
  code: string;
  name: string;
  deckCount: number;
  decks: (Deck | DeckWithCardCount)[];
}

export const getLanguageStats = (
  decks: Deck[] | DeckWithCardCount[]
): LanguageStats[] => {
  const languageMap = new Map<string, LanguageStats>();

  decks.forEach((deck) => {
    const { code, name } = deck.language;

    if (!languageMap.has(code)) {
      languageMap.set(code, {
        code,
        name,
        deckCount: 0,
        decks: [],
      });
    }

    const stats = languageMap.get(code)!;
    stats.deckCount++;
    stats.decks.push(deck);
  });

  return Array.from(languageMap.values()).sort(
    (a, b) => b.deckCount - a.deckCount
  );
};

export const countUniqueLanguages = (
  decks: Deck[] | DeckWithCardCount[]
): number => {
  const uniqueLanguages = new Set(decks.map((deck) => deck.language.code));
  return uniqueLanguages.size;
};

export const formatDifficulty = (difficulty: Difficulty): string =>
  difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
