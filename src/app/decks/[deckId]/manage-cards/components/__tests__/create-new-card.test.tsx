import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, it, expect, vi } from 'vitest';

import CreateNewCard from '../create-new-card';

vi.mock('@/utils/hooks/useApi', () => ({
  useCreateCard: () => ({ mutate: vi.fn(), isPending: false }),
}));

const wrapper = (ui: React.ReactNode) => (
  <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>
);

describe('CreateNewCard', () => {
  it('shows validation message when mandatory fields are missing', async () => {
    const user = userEvent.setup();
    render(wrapper(<CreateNewCard deckId='deck-1' deckScript='Kana' />));

    await user.click(screen.getByRole('button', { name: /Save Card/i }));
    expect(
      screen.getByText(/Please fill in all mandatory fields/i)
    ).toBeInTheDocument();
  });

  it('opens handwriting canvas when clicking draw area', () => {
    render(wrapper(<CreateNewCard deckId='deck-1' deckScript='Kana' />));
    // Click the handwriting placeholder button
    fireEvent.click(screen.getByRole('button', { name: /Click to draw/i }));
    // Dialog should appear (canvas modal content present)
    expect(
      screen.getByText(/Use your mouse, touch or stylus to draw/i)
    ).toBeInTheDocument();
  });
});
