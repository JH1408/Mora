const apiPaths = {
  auth: {
    nextauth: '/api/auth/[...nextauth]',
  },
  cards: {
    base: '/api/cards',
    byId: (cardId: string) => `/api/cards/${cardId}`,
  },
  decks: {
    base: '/api/decks',
    byId: (deckId: string) => `/api/decks/${deckId}`,
    stats: (deckId: string) => `/api/decks/${deckId}/stats`,
    study: {
      base: (deckId: string) => `/api/decks/${deckId}/study`,
      complete: (deckId: string) => `/api/decks/${deckId}/study/complete`,
      submit: (deckId: string) => `/api/decks/${deckId}/study/submit`,
    },
  },
  languages: {
    base: '/api/languages',
  },
};

export default apiPaths;
