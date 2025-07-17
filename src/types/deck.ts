// Re-export all types from the centralized schemas
export type {
  // Request Types
  SignUpRequest,
  SignInRequest,
  CreateDeckRequest,
  UpdateDeckRequest,
  CreateCardRequest,
  UpdateCardRequest,
  StudyParamsRequest,
  SubmitStudyResultRequest,
  CompleteStudySessionRequest,

  // Response Types
  SessionUser,
  Language,
  Languages,
  Deck,
  Decks,
  Card,
  CardProgress,
  StudySession,
  StudyCard,
  StudyDeck,
  StudySessionData,
  SubmitStudyResult,
  CompleteStudySession,
  DeckStats,
  ApiError,

  // Utility Types
  StudyMode,
  Difficulty,
} from '@/lib/schemas';

// Re-export schemas for runtime validation if needed
export {
  // Request Schemas
  signUpSchema,
  signInSchema,
  createDeckSchema,
  updateDeckSchema,
  createCardSchema,
  updateCardSchema,
  studyParamsSchema,
  submitStudySchema,
  completeSessionSchema,

  // Response Schemas
  sessionUserSchema,
  languageSchema,
  languagesSchema,
  deckSchema,
  decksSchema,
  cardSchema,
  cardProgressSchema,
  studySessionSchema,
  studyCardSchema,
  studyDeckSchema,
  studySessionDataSchema,
  submitStudyResultSchema,
  completeStudySessionSchema,
  deckStatsSchema,
  apiErrorSchema,
} from '@/lib/schemas';

// Legacy constants for backward compatibility
export const DIFFICULTY_OPTIONS = [
  { value: 'BEGINNER' as const, label: 'Beginner' },
  { value: 'INTERMEDIATE' as const, label: 'Intermediate' },
  { value: 'ADVANCED' as const, label: 'Advanced' },
] as const;
