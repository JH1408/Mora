import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, it, expect, vi } from 'vitest';

import AnswerControls from '../answer-controls';

describe('AnswerControls', () => {
  it('renders nothing when not flipped', () => {
    const { container } = render(
      <AnswerControls hasBeenFlipped={false} handleStudyResult={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('invokes handlers for Yes/No', async () => {
    const onResult = vi.fn();
    const user = userEvent.setup();
    render(
      <AnswerControls hasBeenFlipped={true} handleStudyResult={onResult} />
    );

    await user.click(screen.getByRole('button', { name: /No/i }));
    await user.click(screen.getByRole('button', { name: /Yes/i }));
    expect(onResult).toHaveBeenCalledWith(false);
    expect(onResult).toHaveBeenCalledWith(true);
  });
});
