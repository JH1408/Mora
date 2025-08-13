import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  languageApi,
  deckApi,
  cardApi,
  studyApi,
  fetchPaginatedStudyCards,
  fetchPaginatedCards,
} from '@/utils/api';
import type {
  Card,
  Deck,
  CreateDeckRequest,
  UpdateDeckRequest,
  CreateCardRequest,
  UpdateCardRequest,
  SubmitStudyResultRequest,
  CompleteStudySessionRequest,
} from '@/utils/types/deck';

const DEFAULT_LIMIT = 20;

export const queryKeys = {
  languages: ['languages'] as const,
  language: (id: string) => ['languages', id] as const,
  decks: ['decks'] as const,
  deck: (id: string) => ['decks', id] as const,
  deckStats: (id: string) => ['deckStats', id] as const,
  infiniteStudyCards: (id: string, limit = DEFAULT_LIMIT) =>
    ['studyCards', id, limit] as const,
  infiniteCards: (id: string, isPracticeSession?: boolean) =>
    ['cards', id, isPracticeSession] as const,
};

export const useLanguages = () => {
  return useQuery({
    queryKey: queryKeys.languages,
    queryFn: languageApi.getAll,
    staleTime: 60 * 60 * 1000, // 60 minutes - languages don't change often
  });
};

export const useLanguage = (id: string) => {
  return useQuery({
    queryKey: queryKeys.language(id),
    queryFn: () => languageApi.getById(id),
    enabled: !!id,
  });
};

export const useDecks = () => {
  return useQuery({
    queryKey: queryKeys.decks,
    queryFn: deckApi.getAll,
    staleTime: 60 * 1000,
  });
};

export const useDeck = (id: string) => {
  return useQuery({
    queryKey: queryKeys.deck(id),
    queryFn: () => deckApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDeckRequest) => deckApi.create(data),
    onSuccess: (data: Deck) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.decks });
      toast.success(`"${data.name}" has been created successfully.`);
    },
    onError: (error) => {
      console.error('Create deck error:', error);
      console.error('Error details:', (error as { details?: unknown }).details);
      toast.error('Failed to create deck. Please try again.');
    },
  });
};

export const useUpdateDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDeckRequest }) =>
      deckApi.update(id, data),
    onSuccess: (updatedDeck) => {
      queryClient.setQueryData(queryKeys.deck(updatedDeck.id), updatedDeck);
      queryClient.invalidateQueries({ queryKey: queryKeys.decks });
    },
  });
};

export const useDeleteDeck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deckApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: queryKeys.deck(deletedId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.decks });
      toast.success('Deck has been deleted successfully.');
    },
    onError: (error) => {
      console.error('Delete deck error:', error);
      toast.error('Failed to delete deck. Please try again.');
    },
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCardRequest) => cardApi.create(data),
    onSuccess: (data: Card) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.infiniteCards(data.deckId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.decks });
      queryClient.invalidateQueries({
        queryKey: queryKeys.deckStats(data.deckId),
      });
      toast.success('Card has been created successfully.');
    },
    onError: (error) => {
      console.error('Create card error:', error);
      toast.error('Failed to create card. Please try again.');
    },
  });
};

export const useDeleteCard = (deckId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cardApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.infiniteCards(deckId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.decks });
      queryClient.invalidateQueries({
        queryKey: queryKeys.deckStats(deckId),
      });
      toast.success('Card has been deleted successfully.');
    },
    onError: (error) => {
      console.error('Delete card error:', error);
      toast.error('Failed to delete card. Please try again.');
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCardRequest }) =>
      cardApi.update(id, data),
    onSuccess: (updatedCard) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.infiniteCards(updatedCard.deckId),
      });
      toast.success('Card has been updated successfully.');
    },
    onError: (error) => {
      console.error('Update card error:', error);
      toast.error('Failed to update card. Please try again.');
    },
  });
};

export const useSubmitStudyResult = (deckId: string) => {
  return useMutation({
    mutationFn: (data: SubmitStudyResultRequest) =>
      studyApi.submitStudyResult(deckId, data),
    // No cache invalidation needed - we'll invalidate at session completion
    onError: (error) => {
      console.error('Submit study result error:', error);
      toast.error(
        'We could not save your progress. We have added the card to the end of the queue.'
      );
    },
  });
};

export const useCompleteStudySession = (deckId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CompleteStudySessionRequest) =>
      studyApi.completeStudySession(deckId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.decks });
      queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.deckStats(deckId) });
      queryClient.removeQueries({
        queryKey: queryKeys.infiniteStudyCards(deckId),
      });
    },
    onError: (error) => {
      console.error('Complete study session error:', error);
      toast.error('Failed to complete study session. Please try again.');
    },
  });
};

export const useDeckStats = (deckId: string) => {
  return useQuery({
    queryKey: queryKeys.deckStats(deckId),
    queryFn: () => deckApi.getStats(deckId),
    enabled: !!deckId,
    staleTime: 60 * 1000, // 1 minute
  });
};

export const useInfiniteStudyCards = (
  deckId: string,
  limit = DEFAULT_LIMIT
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.infiniteStudyCards(deckId, limit),
    queryFn: ({ pageParam }) =>
      fetchPaginatedStudyCards(deckId, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
    enabled: !!deckId,
    staleTime: 30 * 60 * 1000, // 30 minutes - prevent refetch during study sessions
    gcTime: 60 * 60 * 1000, // 1 hour - keep in cache longer for study sessions
  });
};

export const useInfiniteCards = (deckId: string, isPracticeSession?: boolean) =>
  useInfiniteQuery({
    queryKey: queryKeys.infiniteCards(deckId, isPracticeSession),
    queryFn: ({ pageParam }) =>
      fetchPaginatedCards(deckId as string, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
    enabled:
      isPracticeSession === undefined
        ? !!deckId
        : isPracticeSession && !!deckId,
    staleTime: isPracticeSession
      ? 30 * 60 * 1000 // 30 minutes for practice sessions
      : 5 * 60 * 1000, // 5 minutes for regular card management
    gcTime: isPracticeSession
      ? 60 * 60 * 1000 // 1 hour for practice sessions
      : 10 * 60 * 1000, // 10 minutes for regular card management
  });
