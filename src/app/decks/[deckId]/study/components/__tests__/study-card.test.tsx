import { render, screen, fireEvent } from '@testing-library/react';

import { describe, it, expect, vi } from 'vitest';

import type { StudyCard as StudyCardType } from '@/utils/types/deck';
import { STUDY_MODES } from '@/utils/types/studySession';

import StudyCard from '../study-card';

const baseCard: StudyCardType = {
  id: 'c1',
  frontText: 'Hello',
  backText: 'こんにちは',
  phoneticSpelling: undefined,
  handwritingImage: undefined,
  createdAt: new Date().toISOString(),
};

describe('StudyCard', () => {
  it('flips on click and calls setIsFlipped', () => {
    const setIsFlipped = vi.fn();
    render(
      <StudyCard
        isFlipped={false}
        setIsFlipped={setIsFlipped}
        studyMode={STUDY_MODES.RECOGNITION}
        currentCard={baseCard}
        speakText={() => {}}
        fontClass=''
        hasBeenFlipped={false}
      />
    );

    fireEvent.click(screen.getByText(baseCard.frontText));
    expect(setIsFlipped).toHaveBeenCalledWith(true);
  });

  it('shows phonetic spelling and handwriting only on back side when present', () => {
    const cardWithExtras: StudyCardType = {
      ...baseCard,
      phoneticSpelling: 'Kon-ni-chi-wa',
      handwritingImage: '/images/mora_logo.png',
    };

    render(
      <StudyCard
        isFlipped={true}
        setIsFlipped={() => {}}
        studyMode={STUDY_MODES.RECOGNITION}
        currentCard={cardWithExtras}
        speakText={() => {}}
        fontClass=''
        hasBeenFlipped={true}
      />
    );

    expect(screen.getByText(baseCard.backText)).toBeInTheDocument();
    expect(
      screen.getByText(cardWithExtras.phoneticSpelling!)
    ).toBeInTheDocument();
    const img = screen.getByRole('img', { name: /Handwritten Content/i });
    expect(img).toBeInTheDocument();
  });
});
