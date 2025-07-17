import type {
  Card,
  Deck,
  Decks,
  Language,
  Languages,
  DeckStats,
  StudySessionData,
  SubmitStudyResult,
  CompleteStudySession,
  CreateDeckRequest,
  UpdateDeckRequest,
  CreateCardRequest,
  UpdateCardRequest,
  SubmitStudyResultRequest,
  CompleteStudySessionRequest,
  StudyMode,
} from '@/types/deck';

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
  getAll: (): Promise<Languages> => apiFetch<Languages>('/languages'),

  getById: (id: string): Promise<Language> =>
    apiFetch<Language>(`/languages/${id}`),
};

// Deck API functions
export const deckApi = {
  getAll: (): Promise<Decks> => apiFetch<Decks>('/decks'),

  getById: (id: string): Promise<Deck> => apiFetch<Deck>(`/decks/${id}`),

  create: (data: CreateDeckRequest): Promise<Deck> =>
    apiFetch<Deck>('/decks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateDeckRequest): Promise<Deck> =>
    apiFetch<Deck>(`/decks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    apiFetch<void>(`/decks/${id}`, {
      method: 'DELETE',
    }),

  getStats: (id: string): Promise<DeckStats> =>
    apiFetch<DeckStats>(`/decks/${id}/stats`),
};

// Card API functions
export const cardApi = {
  create: (data: CreateCardRequest): Promise<Card> =>
    apiFetch<Card>('/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateCardRequest): Promise<Card> =>
    apiFetch<Card>(`/cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    apiFetch<void>(`/cards/${id}`, {
      method: 'DELETE',
    }),
};

// Study API functions
export const studyApi = {
  getStudyCards: (
    deckId: string,
    params?: {
      limit?: number;
      studyMode?: StudyMode;
    }
  ): Promise<StudySessionData> => {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.studyMode) searchParams.append('studyMode', params.studyMode);

    const queryString = searchParams.toString();
    const endpoint = `/decks/${deckId}/study${
      queryString ? `?${queryString}` : ''
    }`;

    return apiFetch<StudySessionData>(endpoint);
  },

  submitStudyResult: (
    deckId: string,
    data: SubmitStudyResultRequest
  ): Promise<SubmitStudyResult> =>
    apiFetch<SubmitStudyResult>(`/decks/${deckId}/study/submit`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  completeStudySession: (
    deckId: string,
    data: CompleteStudySessionRequest
  ): Promise<CompleteStudySession> =>
    apiFetch(`/decks/${deckId}/study/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
