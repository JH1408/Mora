import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { languageApi, deckApi, cardApi, studyApi } from '@/lib/api';
import type {
  Card,
  Deck,
  CreateDeckRequest,
  UpdateDeckRequest,
  CreateCardRequest,
  UpdateCardRequest,
  SubmitStudyResultRequest,
  CompleteStudySessionRequest,
} from '@/types/deck';

// Query keys for React Query
export const queryKeys = {
  languages: ['languages'] as const,
  language: (id: string) => ['languages', id] as const,
  decks: ['decks'] as const,
  deck: (id: string) => ['decks', id] as const,
};

// Language hooks
export const useLanguages = () => {
  return useQuery({
    queryKey: queryKeys.languages,
    queryFn: languageApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes - languages don't change often
  });
};

export const useLanguage = (id: string) => {
  return useQuery({
    queryKey: queryKeys.language(id),
    queryFn: () => languageApi.getById(id),
    enabled: !!id,
  });
};

// Deck hooks
export const useDecks = () => {
  return useQuery({
    queryKey: queryKeys.decks,
    queryFn: deckApi.getAll,
    staleTime: 30 * 1000, // 30 seconds
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
      // Invalidate and refetch decks list
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
      // Update the specific deck in cache
      queryClient.setQueryData(queryKeys.deck(updatedDeck.id), updatedDeck);
      // Invalidate decks list
      queryClient.invalidateQueries({ queryKey: queryKeys.decks });
    },
  });
};

export const useDeleteDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deckApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove the deck from cache
      queryClient.removeQueries({ queryKey: queryKeys.deck(deletedId) });
      // Invalidate decks list
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
      // Invalidate and refetch deck
      queryClient.invalidateQueries({ queryKey: queryKeys.deck(data.deckId) });
      // Also invalidate decks list to update card count
      queryClient.invalidateQueries({ queryKey: queryKeys.decks });
      toast.success('Card has been created successfully.');
    },
    onError: (error) => {
      console.error('Create card error:', error);
      toast.error('Failed to create card. Please try again.');
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cardApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.deck(deletedId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.decks });
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
      // Invalidate the specific deck to refresh the cards
      queryClient.invalidateQueries({
        queryKey: queryKeys.deck(updatedCard.deckId),
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubmitStudyResultRequest) =>
      studyApi.submitStudyResult(deckId, data),
    onSuccess: () => {
      // @Josy TODO: do we really want this?
      // Invalidate deck stats and study cards
      queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
    },
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
      // Invalidate deck stats and study session
      queryClient.invalidateQueries({ queryKey: queryKeys.deck(deckId) });
    },
    onError: (error) => {
      console.error('Complete study session error:', error);
      toast.error('Failed to complete study session. Please try again.');
    },
  });
};

export const useDeckStats = (deckId: string) => {
  return useQuery({
    queryKey: ['deckStats', deckId],
    queryFn: () => deckApi.getStats(deckId),
    enabled: !!deckId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

// @Josy TODO: think about stale time and gcTime - we don't want to refetch while the user is studying?
export const useStudyCards = (deckId: string) => {
  return useQuery({
    queryKey: ['studyCards', deckId],
    queryFn: () => studyApi.getStudyCards(deckId),
    enabled: !!deckId,
  });
};
