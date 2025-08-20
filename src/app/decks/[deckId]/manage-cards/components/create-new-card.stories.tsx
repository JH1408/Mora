import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CreateNewCard from './create-new-card';

const meta = {
  title: 'ManageCards/CreateNewCard',
  component: CreateNewCard,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => {
      const qc = new QueryClient();
      return (
        <QueryClientProvider client={qc}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
  args: {
    deckId: 'deck-1',
    deckScript: 'Kana',
  },
} satisfies Meta<typeof CreateNewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
