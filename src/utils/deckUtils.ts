import { Deck, Difficulty } from './schemas';

interface LanguageStats {
  code: string;
  name: string;
  deckCount: number;
  decks: Deck[];
}

export const getLanguageStats = (decks: Deck[]): LanguageStats[] => {
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

export const countUniqueLanguages = (decks: Deck[]): number => {
  const uniqueLanguages = new Set(decks.map((deck) => deck.language.code));
  return uniqueLanguages.size;
};

export const formatDifficulty = (difficulty: Difficulty): string =>
  difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
