export interface CardProgressData {
  easinessFactor: number;
  repetitions: number;
  intervalDays: number;
  nextReviewDate: Date;
  totalReviews: number;
  correctReviews: number;
}

/**
 * SM-2 Spaced Repetition Algorithm (no difficulty rating)
 */
export function calculateNextReview(
  currentProgress: CardProgressData,
  isCorrect: boolean
): CardProgressData {
  const { easinessFactor, intervalDays } = currentProgress;
  let { repetitions, totalReviews, correctReviews } = currentProgress;

  // Update review counts
  totalReviews += 1;
  if (isCorrect) {
    correctReviews += 1;
  }

  // Use fixed quality: 5 if correct, 0 if not
  const quality = isCorrect ? 5 : 0;
  const newEasinessFactor = Math.max(
    1.3,
    easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Calculate new interval
  let newIntervalDays: number;
  if (isCorrect) {
    if (repetitions === 0) {
      newIntervalDays = 1;
    } else if (repetitions === 1) {
      newIntervalDays = 6;
    } else {
      newIntervalDays = Math.round(intervalDays * newEasinessFactor);
    }
    repetitions += 1;
  } else {
    // Reset on incorrect answer
    newIntervalDays = 1;
    repetitions = 0;
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newIntervalDays);

  return {
    easinessFactor: newEasinessFactor,
    repetitions,
    intervalDays: newIntervalDays,
    nextReviewDate,
    totalReviews,
    correctReviews,
  };
}

/**
 * Get cards that are due for review
 */
export function getDueCards(
  cards: Array<{ id: string; cardProgress?: CardProgressData | null }>
) {
  const now = new Date();
  return cards.filter((card) => {
    if (!card.cardProgress) {
      // New card, always due
      return true;
    }
    return card.cardProgress.nextReviewDate <= now;
  });
}

/**
 * Sort cards by priority for study
 */
export function sortCardsByPriority(
  cards: Array<{ id: string; cardProgress?: CardProgressData | null }>
) {
  return cards.sort((a, b) => {
    // New cards (no progress) have highest priority
    if (!a.cardProgress && !b.cardProgress) return 0;
    if (!a.cardProgress) return -1;
    if (!b.cardProgress) return 1;

    // Then sort by next review date (earliest first)
    return (
      a.cardProgress.nextReviewDate.getTime() -
      b.cardProgress.nextReviewDate.getTime()
    );
  });
}
