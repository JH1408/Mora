import { Card } from '@prisma/client';

import {
  CreateCardRequest,
  CreateDeckRequest,
  Deck,
  DeckWithCardCount,
} from '@/types/deck';

export interface Language {
  id: string;
  code: string;
  name: string;
  script?: string;
  rtl: boolean;
  ttsSupported: boolean;
}

const API_BASE = '/api';

// Generic fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.error || `HTTP error! status: ${response.status}`;
    const error = new Error(errorMessage);
    (error as { details?: unknown }).details =
      errorData.details || errorData.message;
    throw error;
  }

  return response.json();
}

// Language API functions
export const languageApi = {
  getAll: (): Promise<Language[]> => apiFetch<Language[]>('/languages'),

  getById: (id: string): Promise<Language> =>
    apiFetch<Language>(`/languages/${id}`),
};

// Deck API functions
export const deckApi = {
  getAll: (): Promise<DeckWithCardCount[]> =>
    apiFetch<DeckWithCardCount[]>('/decks'),

  getById: (id: string): Promise<Deck> => apiFetch<Deck>(`/decks/${id}`),

  create: (data: CreateDeckRequest): Promise<Deck> =>
    apiFetch<Deck>('/decks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<CreateDeckRequest>): Promise<Deck> =>
    apiFetch<Deck>(`/decks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    apiFetch<void>(`/decks/${id}`, {
      method: 'DELETE',
    }),
};

// Card API functions
export const cardApi = {
  create: (data: CreateCardRequest): Promise<Card> =>
    apiFetch<Card>('/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<CreateCardRequest>): Promise<Card> =>
    apiFetch<Card>(`/cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    apiFetch<void>(`/cards/${id}`, {
      method: 'DELETE',
    }),
};
