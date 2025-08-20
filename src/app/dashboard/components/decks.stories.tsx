import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Decks from './decks';
import type { Deck } from '@/utils/types/deck';

const decks: Deck[] = [
  {
    id: 'd1',
    name: 'N5 Basics',
    description: 'Basic Japanese words',
    language: {
      id: 'lang-ja',
      code: 'ja',
      name: 'Japanese',
      script: 'Kana',
      rtl: false,
      ttsSupported: true,
    },
    languageId: 'lang-ja',
    difficulty: 'BEGINNER',
    cardsCount: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'u1',
    isActive: true,
    user: { id: 'u1', name: 'User', email: 'user@example.com' },
  },
  {
    id: 'd2',
    name: 'Thai Tones',
    description: 'Thai pronunciation practice',
    language: {
      id: 'lang-th',
      code: 'th',
      name: 'Thai',
      script: 'Thai',
      rtl: false,
      ttsSupported: true,
    },
    languageId: 'lang-th',
    difficulty: 'INTERMEDIATE',
    cardsCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'u1',
    isActive: true,
    user: { id: 'u1', name: 'User', email: 'user@example.com' },
  },
];

const meta = {
  title: 'Dashboard/Decks',
  component: Decks,
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
    decks,
    openCreateDeckModal: (langId: string) =>
      console.log('open create modal for', langId),
  },
} satisfies Meta<typeof Decks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
