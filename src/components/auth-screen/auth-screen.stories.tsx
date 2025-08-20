import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import AuthScreenPresenter from './auth-screen.presenter';

const meta = {
  title: 'Components/AuthScreen',
  component: AuthScreenPresenter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Authentication screen presenter component for sign-in and sign-up flows with Google OAuth integration. This component handles the UI presentation for user authentication through Google OAuth and provides different states for sign-in and sign-up flows.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isSignUp: false,
    error: null,
    isLoading: false,
    handleGoogleSignIn: () => console.log('Google sign in clicked'),
    status: 'unauthenticated' as const,
  },
} satisfies Meta<typeof AuthScreenPresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  args: {
    isSignUp: false,
    error: null,
    isLoading: false,
    handleGoogleSignIn: () => console.log('Google sign in clicked'),
    status: 'unauthenticated',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default sign-in screen with Google OAuth button. Shows the standard authentication flow for existing users.',
      },
    },
  },
};

export const SignUp: Story = {
  args: {
    isSignUp: true,
    error: null,
    isLoading: false,
    handleGoogleSignIn: () => console.log('Google sign in clicked'),
    status: 'unauthenticated',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sign-up screen with different text and messaging for new user registration.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    isSignUp: false,
    error: 'access_denied',
    isLoading: false,
    handleGoogleSignIn: () => console.log('Google sign in clicked'),
    status: 'unauthenticated',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sign-in screen showing error state when authentication fails. Displays error messages for failed login attempts.',
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    isSignUp: false,
    error: null,
    isLoading: true,
    handleGoogleSignIn: () => console.log('Google sign in clicked'),
    status: 'unauthenticated',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loading state when user is being authenticated. This state is shown during the OAuth process.',
      },
    },
  },
};

export const SignUpWithError: Story = {
  args: {
    isSignUp: true,
    error: 'account_creation_failed',
    isLoading: false,
    handleGoogleSignIn: () => console.log('Google sign in clicked'),
    status: 'unauthenticated',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sign-up screen showing error state when account creation fails.',
      },
    },
  },
};

export const SignUpLoading: Story = {
  args: {
    isSignUp: true,
    error: null,
    isLoading: true,
    handleGoogleSignIn: () => console.log('Google sign in clicked'),
    status: 'unauthenticated',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sign-up screen in loading state during account creation.',
      },
    },
  },
};
