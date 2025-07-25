import apiPaths from '@/utils/apiPaths';
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
} from '@/utils/types/deck';

// Generic fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(endpoint, {
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
  getAll: (): Promise<Languages> =>
    apiFetch<Languages>(apiPaths.languages.base),

  getById: (id: string): Promise<Language> =>
    apiFetch<Language>(`${apiPaths.languages.base}/${id}`),
};

// Deck API functions
export const deckApi = {
  getAll: (): Promise<Decks> => apiFetch<Decks>(apiPaths.decks.base),

  getById: (id: string): Promise<Deck> =>
    apiFetch<Deck>(apiPaths.decks.byId(id)),

  create: (data: CreateDeckRequest): Promise<Deck> =>
    apiFetch<Deck>(apiPaths.decks.base, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateDeckRequest): Promise<Deck> =>
    apiFetch<Deck>(apiPaths.decks.byId(id), {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    apiFetch<void>(apiPaths.decks.byId(id), {
      method: 'DELETE',
    }),

  getStats: (id: string): Promise<DeckStats> =>
    apiFetch<DeckStats>(apiPaths.decks.stats(id)),
};

// Card API functions
export const cardApi = {
  create: (data: CreateCardRequest): Promise<Card> =>
    apiFetch<Card>(apiPaths.cards.base, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateCardRequest): Promise<Card> =>
    apiFetch<Card>(apiPaths.cards.byId(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    apiFetch<void>(apiPaths.cards.byId(id), {
      method: 'DELETE',
    }),
};

export async function fetchPaginatedCards(
  deckId: string,
  cursor?: string,
  limit = 20
) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.append('cursor', cursor);
  const res = await fetch(`/api/decks/${deckId}/cards?${params}`);
  if (!res.ok) throw new Error('Failed to fetch cards');
  return res.json();
}

// Study API functions
export const studyApi = {
  getStudyCards: (
    deckId: string,
    params?: {
      limit?: number;
      studyMode?: StudyMode;
      cursor?: string;
    }
  ): Promise<StudySessionData> => {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.studyMode) searchParams.append('studyMode', params.studyMode);
    if (params?.cursor) searchParams.append('cursor', params.cursor);

    const queryString = searchParams.toString();
    const endpoint = `${apiPaths.decks.study.base(deckId)}${
      queryString ? `?${queryString}` : ''
    }`;

    return apiFetch<StudySessionData>(endpoint);
  },

  submitStudyResult: (
    deckId: string,
    data: SubmitStudyResultRequest
  ): Promise<SubmitStudyResult> =>
    apiFetch<SubmitStudyResult>(apiPaths.decks.study.submit(deckId), {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  completeStudySession: (
    deckId: string,
    data: CompleteStudySessionRequest
  ): Promise<CompleteStudySession> =>
    apiFetch(apiPaths.decks.study.complete(deckId), {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Infinite pagination helper for study cards
export async function fetchPaginatedStudyCards(
  deckId: string,
  cursor?: string,
  limit = 20
) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.append('cursor', cursor);
  const res = await fetch(`/api/decks/${deckId}/study?${params}`);
  if (!res.ok) throw new Error('Failed to fetch study cards');
  return res.json();
}
