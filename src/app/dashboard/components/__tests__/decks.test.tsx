import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, it, expect, vi } from 'vitest';

import type { Deck } from '@/utils/types/deck';

import Decks from '../decks';

const wrapper = (ui: React.ReactNode) => (
  <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>
);

const decks: Deck[] = [
  {
    id: 'd1',
    name: 'N5 Basics',
    description: 'Basic Japanese words',
    languageId: 'lang-ja',
    language: {
      id: 'lang-ja',
      code: 'ja',
      name: 'Japanese',
      rtl: false,
      ttsSupported: true,
      script: 'Kana',
    },
    userId: 'u1',
    user: { id: 'u1', name: 'User', email: 'user@example.com' },
    difficulty: 'BEGINNER',
    isActive: true,
    cardsCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'd2',
    name: 'Thai Tones',
    description: 'Thai pronunciation practice',
    languageId: 'lang-th',
    language: {
      id: 'lang-th',
      code: 'th',
      name: 'Thai',
      rtl: false,
      ttsSupported: true,
      script: 'Thai',
    },
    userId: 'u1',
    user: { id: 'u1', name: 'User', email: 'user@example.com' },
    difficulty: 'INTERMEDIATE',
    isActive: true,
    cardsCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe('Decks', () => {
  it('renders language groups and toggles expansion', async () => {
    const user = userEvent.setup();
    render(wrapper(<Decks decks={decks} openCreateDeckModal={() => {}} />));

    // Two language headers visible
    expect(screen.getByText('Japanese')).toBeInTheDocument();
    expect(screen.getByText('Thai')).toBeInTheDocument();

    // Collapse first language
    await user.click(screen.getByRole('button', { name: /Japanese/i }));
    // After collapse, card title should not be visible
    expect(screen.queryByText('N5 Basics')).not.toBeInTheDocument();
  });

  it('invokes openCreateDeckModal with correct language id', async () => {
    const openCreate = vi.fn();
    const user = userEvent.setup();
    render(wrapper(<Decks decks={decks} openCreateDeckModal={openCreate} />));

    await user.click(
      screen.getAllByRole('button', { name: /Add a New Deck/i })[0]
    );
    expect(openCreate).toHaveBeenCalledWith('lang-ja');
  });
});
