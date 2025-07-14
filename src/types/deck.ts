import { Card } from '@prisma/client';

export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export const DIFFICULTY_OPTIONS = [
  { value: 'BEGINNER' as const, label: 'Beginner' },
  { value: 'INTERMEDIATE' as const, label: 'Intermediate' },
  { value: 'ADVANCED' as const, label: 'Advanced' },
] as const;

export interface CreateDeckRequest {
  name: string;
  description?: string;
  difficulty?: Difficulty;
  languageId: string;
}

export interface CreateCardRequest {
  deckId: string;
  frontText: string;
  backText: string;
  phoneticSpelling?: string;
  usageContext?: string;
  tags?: string[];
  handwritingData?: string;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  difficulty?: Difficulty;
  languageId: string;
  userId: string;
  isActive: boolean;
  cardsCount: number;
  createdAt: string;
  updatedAt: string;
  language: {
    id: string;
    code: string;
    name: string;
    script?: string;
    rtl: boolean;
    ttsSupported: boolean;
  };
  user: {
    id: string;
    name?: string;
    email?: string;
  };
  cards: Card[];
}

export interface DeckWithCardCount extends Omit<Deck, 'user'> {
  _count: {
    cards: number;
  };
}
