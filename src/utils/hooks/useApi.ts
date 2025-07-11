import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { languageApi, deckApi } from '@/lib/api';
import { CreateDeckRequest, Deck } from '@/types/deck';
import { toast } from 'sonner';

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
      console.log({ error });
      console.error('Create deck error:', error);
      console.error('Error details:', (error as { details?: unknown }).details);
      toast.error('Failed to create deck. Please try again.');
    },
  });
};

export const useUpdateDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateDeckRequest>;
    }) => deckApi.update(id, data),
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
    },
  });
};
