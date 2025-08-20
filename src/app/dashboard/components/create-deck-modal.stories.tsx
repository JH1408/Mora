import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CreateDeckModal from './create-deck-modal';

const languages = [
  { id: 'lang-ja', code: 'ja', name: 'Japanese', script: 'Kana', rtl: false },
  { id: 'lang-th', code: 'th', name: 'Thai', script: 'Thai', rtl: false },
];

const meta = {
  title: 'Dashboard/CreateDeckModal',
  component: CreateDeckModal,
  parameters: { layout: 'centered' },
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
    isOpen: true,
    onClose: () => console.log('close'),
    languages,
    language: '',
    setLanguage: (id: string) => console.log('set language', id),
  },
} satisfies Meta<typeof CreateDeckModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
