import { Deck, Difficulty } from './schemas';

interface LanguageStats {
  code: string;
  name: string;
  deckCount: number;
  decks: Deck[];
  mostRecentDate?: Date;
  id: string;
}

export const getLanguageStats = (decks: Deck[]): LanguageStats[] => {
  const languageMap = new Map<string, LanguageStats>();

  decks.forEach((deck) => {
    const { code, name, id } = deck.language;

    if (!languageMap.has(code)) {
      languageMap.set(code, {
        code,
        name,
        deckCount: 0,
        decks: [],
        mostRecentDate: undefined,
        id,
      });
    }

    const stats = languageMap.get(code)!;
    stats.deckCount++;
    stats.decks.push(deck);
  });

  for (const stats of languageMap.values()) {
    stats.mostRecentDate = stats.decks.reduce(
      (latest: Date | undefined, deck) => {
        const dateRaw = deck.lastStudiedAt ?? deck.createdAt;
        const date = dateRaw ? new Date(dateRaw) : undefined;
        if (!latest || (date && date > latest)) {
          return date;
        }
        return latest;
      },
      undefined
    );
  }

  return Array.from(languageMap.values()).sort((a, b) => {
    const aTime = a.mostRecentDate ? a.mostRecentDate.getTime() : 0;
    const bTime = b.mostRecentDate ? b.mostRecentDate.getTime() : 0;
    return bTime - aTime;
  });
};

export const countUniqueLanguages = (decks: Deck[]): number => {
  const uniqueLanguages = new Set(decks.map((deck) => deck.language.code));
  return uniqueLanguages.size;
};

export const formatDifficulty = (difficulty: Difficulty): string =>
  difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
