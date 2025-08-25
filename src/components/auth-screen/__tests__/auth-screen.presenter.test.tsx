import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, it, expect, vi } from 'vitest';

import AuthScreenPresenter from '../auth-screen.presenter';

describe('AuthScreenPresenter', () => {
  it('renders sign-in copy by default', () => {
    render(
      <AuthScreenPresenter
        isSignUp={false}
        error={null}
        isLoading={false}
        handleGoogleSignIn={() => {}}
        status='unauthenticated'
      />
    );
    expect(screen.getByText(/Welcome Back to Mora/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Continue with Google/i })
    ).toBeInTheDocument();
  });

  it('renders sign-up copy when isSignUp is true', () => {
    render(
      <AuthScreenPresenter
        isSignUp
        error={null}
        isLoading={false}
        handleGoogleSignIn={() => {}}
        status='unauthenticated'
      />
    );
    expect(screen.getByText(/Welcome to Mora/i)).toBeInTheDocument();
  });

  it('shows error message when error is present', () => {
    render(
      <AuthScreenPresenter
        isSignUp={false}
        error={'access_denied'}
        isLoading={false}
        handleGoogleSignIn={() => {}}
        status='unauthenticated'
      />
    );
    expect(screen.getByText(/could not sign you in/i)).toBeInTheDocument();
  });

  it('disables primary button and shows loading copy when isLoading', () => {
    render(
      <AuthScreenPresenter
        isSignUp={false}
        error={null}
        isLoading
        handleGoogleSignIn={() => {}}
        status='unauthenticated'
      />
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveTextContent(/Signing in/i);
  });

  it('calls handleGoogleSignIn on button click', async () => {
    const onSignIn = vi.fn();
    const user = userEvent.setup();
    render(
      <AuthScreenPresenter
        isSignUp={false}
        error={null}
        isLoading={false}
        handleGoogleSignIn={onSignIn}
        status='unauthenticated'
      />
    );
    await user.click(
      screen.getByRole('button', { name: /Continue with Google/i })
    );
    expect(onSignIn).toHaveBeenCalledTimes(1);
  });

  it('shows only the loading view when status is loading or authenticated', () => {
    const { rerender } = render(
      <AuthScreenPresenter
        isSignUp={false}
        error={null}
        isLoading={false}
        handleGoogleSignIn={() => {}}
        status='loading'
      />
    );
    expect(
      screen.queryByRole('button', { name: /Continue with Google/i })
    ).not.toBeInTheDocument();

    rerender(
      <AuthScreenPresenter
        isSignUp={false}
        error={null}
        isLoading={false}
        handleGoogleSignIn={() => {}}
        status='authenticated'
      />
    );
    expect(
      screen.queryByRole('button', { name: /Continue with Google/i })
    ).not.toBeInTheDocument();
  });
});
