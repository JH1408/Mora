import { z } from 'zod';

// ===== REQUEST SCHEMAS =====

// Auth Request Schemas
export const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Deck Request Schemas
export const createDeckSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  description: z.string().optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  languageId: z.string().min(1, 'Language ID is required'),
});

export const updateDeckSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .optional(),
  description: z.string().optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  languageId: z.string().min(1, 'Language ID is required').optional(),
  isActive: z.boolean().optional(),
});

// Card Request Schemas
export const createCardSchema = z.object({
  deckId: z.string().min(1, 'Deck ID is required'),
  frontText: z
    .string()
    .min(1, 'Front text is required')
    .max(1000, 'Front text must be less than 1000 characters'),
  backText: z
    .string()
    .min(1, 'Back text is required')
    .max(1000, 'Back text must be less than 1000 characters'),
  phoneticSpelling: z.string().optional(),
  usageContext: z.string().optional(),
  tags: z.array(z.string()).optional(),
  handwritingData: z.string().optional(),
});

export const updateCardSchema = z.object({
  frontText: z
    .string()
    .min(1, 'Front text is required')
    .max(1000, 'Front text must be less than 1000 characters')
    .optional(),
  backText: z
    .string()
    .min(1, 'Back text is required')
    .max(1000, 'Back text must be less than 1000 characters')
    .optional(),
  phoneticSpelling: z.string().optional(),
  usageContext: z.string().optional(),
  tags: z.array(z.string()).optional(),
  handwritingData: z.string().optional(),
});

// Study Request Schemas
export const studyParamsSchema = z.object({
  limit: z.number().min(1).max(50).optional().default(20),
  studyMode: z
    .enum(['recognition', 'recall'])
    .optional()
    .default('recognition'),
});

export const submitStudySchema = z.object({
  cardId: z.string().min(1, 'Card ID is required'),
  isCorrect: z.boolean(),
  studySessionId: z.string().optional(),
});

export const completeSessionSchema = z.object({
  studySessionId: z.string().min(1, 'Study session ID is required'),
  sessionDuration: z.number().min(1, 'Session duration is required'),
});

// ===== RESPONSE SCHEMAS =====

// Auth Response Schemas
export const sessionUserSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

// Language Response Schemas
export const languageSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  script: z.string().nullable().optional(),
  rtl: z.boolean(),
  ttsSupported: z.boolean(),
});

export const languagesSchema = z.array(languageSchema);

// Deck Response Schemas
export const deckSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  difficulty: z
    .enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
    .nullable()
    .optional(),
  languageId: z.string(),
  userId: z.string(),
  isActive: z.boolean(),
  cardsCount: z.number(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
  language: z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    script: z.string().nullable().optional(),
    rtl: z.boolean(),
    ttsSupported: z.boolean(),
  }),
  user: z.object({
    id: z.string(),
    name: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
  }),
  cards: z.array(z.any()).optional(),
});

export const decksSchema = z.array(deckSchema);

// Card Response Schemas
export const cardSchema = z.object({
  id: z.string(),
  deckId: z.string(),
  frontText: z.string(),
  backText: z.string(),
  phoneticSpelling: z.string().nullable().optional(),
  usageContext: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  handwritingData: z.string().optional(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

// Study Response Schemas
export const cardProgressSchema = z.object({
  id: z.string(),
  easinessFactor: z.number(),
  repetitions: z.number(),
  intervalDays: z.number(),
  nextReviewDate: z.union([z.string(), z.date()]),
  totalReviews: z.number(),
  correctReviews: z.number(),
  lastDifficultyRating: z.string().nullable().optional(),
});

export const studySessionSchema = z.object({
  id: z.string(),
  studyMode: z.string(),
  startedAt: z.union([z.string(), z.date()]),
  cardsStudied: z.number().optional(),
  correctAnswers: z.number().optional(),
  accuracy: z.number().optional(),
  sessionDuration: z.number().nullable().optional(),
  completedAt: z.union([z.string(), z.date()]).nullable().optional(),
});

export const studyCardSchema = z.object({
  id: z.string(),
  frontText: z.string(),
  backText: z.string(),
  phoneticSpelling: z.string().nullable().optional(),
  usageContext: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.union([z.string(), z.date()]),
  cardProgress: cardProgressSchema.nullable().optional(),
});

export const studyDeckSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    script: z.string().nullable().optional(),
    rtl: z.boolean(),
    ttsSupported: z.boolean(),
  }),
});

export const studySessionDataSchema = z.object({
  deck: studyDeckSchema,
  studySession: studySessionSchema,
  cards: z.array(studyCardSchema),
  totalDue: z.number(),
  totalCards: z.number(),
});

export const submitStudyResultSchema = z.object({
  cardProgress: cardProgressSchema,
  studySession: studySessionSchema.nullable().optional(),
  nextReviewDate: z.union([z.string(), z.date()]),
  accuracy: z.number(),
});

export const completeStudySessionSchema = z.object({
  studySession: studySessionSchema,
  deck: z.object({
    id: z.string(),
    name: z.string(),
    language: z.object({
      id: z.string(),
      code: z.string(),
      name: z.string(),
      script: z.string().nullable().optional(),
      rtl: z.boolean(),
      ttsSupported: z.boolean(),
    }),
    totalCards: z.number(),
    cardsWithProgress: z.number(),
    overallAccuracy: z.number(),
    totalReviews: z.number(),
  }),
});

// Stats Response Schemas
export const deckStatsSchema = z.object({
  deck: z.object({
    id: z.string(),
    name: z.string(),
    language: z.object({
      id: z.string(),
      code: z.string(),
      name: z.string(),
      script: z.string().nullable().optional(),
      rtl: z.boolean(),
      ttsSupported: z.boolean(),
    }),
    totalCards: z.number(),
    cardsWithProgress: z.number(),
    dueCards: z.number(),
  }),
  progress: z.object({
    totalReviews: z.number(),
    correctReviews: z.number(),
    overallAccuracy: z.number(),
    averageEasinessFactor: z.number(),
    totalRepetitions: z.number(),
    studyStreak: z.number(),
  }),
  difficultyBreakdown: z.object({
    easy: z.number(),
    medium: z.number(),
    hard: z.number(),
    new: z.number(),
  }),
  recentSessions: z.array(
    z.object({
      id: z.string(),
      cardsStudied: z.number(),
      correctAnswers: z.number(),
      accuracy: z.number(),
      studyMode: z.string(),
      sessionDuration: z.number().nullable().optional(),
      completedAt: z.union([z.string(), z.date()]).nullable().optional(),
    })
  ),
});

// ===== UTILITY SCHEMAS =====

export const apiErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  details: z.unknown().optional(),
});

// ===== TYPE EXPORTS =====

// Request Types
export type SignUpRequest = z.infer<typeof signUpSchema>;
export type SignInRequest = z.infer<typeof signInSchema>;
export type CreateDeckRequest = z.infer<typeof createDeckSchema>;
export type UpdateDeckRequest = z.infer<typeof updateDeckSchema>;
export type CreateCardRequest = z.infer<typeof createCardSchema>;
export type UpdateCardRequest = z.infer<typeof updateCardSchema>;
export type StudyParamsRequest = z.infer<typeof studyParamsSchema>;
export type SubmitStudyResultRequest = z.infer<typeof submitStudySchema>;
export type CompleteStudySessionRequest = z.infer<typeof completeSessionSchema>;

// Response Types
export type SessionUser = z.infer<typeof sessionUserSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Languages = z.infer<typeof languagesSchema>;
export type Deck = z.infer<typeof deckSchema>;
export type Decks = z.infer<typeof decksSchema>;
export type Card = z.infer<typeof cardSchema>;
export type CardProgress = z.infer<typeof cardProgressSchema>;
export type StudySession = z.infer<typeof studySessionSchema>;
export type StudyCard = z.infer<typeof studyCardSchema>;
export type StudyDeck = z.infer<typeof studyDeckSchema>;
export type StudySessionData = z.infer<typeof studySessionDataSchema>;
export type SubmitStudyResult = z.infer<typeof submitStudyResultSchema>;
export type CompleteStudySession = z.infer<typeof completeStudySessionSchema>;
export type DeckStats = z.infer<typeof deckStatsSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;

// Utility Types
export type StudyMode = 'recognition' | 'recall';
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export const sessionSchema = z.object({
  user: sessionUserSchema.optional(),
  expires: z.string().optional(),
});
export type Session = z.infer<typeof sessionSchema>;
