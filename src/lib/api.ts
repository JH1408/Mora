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
import apiPaths from '@/utils/apiPaths';

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
      method: 'PUT',
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
