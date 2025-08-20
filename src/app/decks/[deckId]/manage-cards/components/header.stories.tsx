import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Header from './header';

const meta = {
  title: 'ManageCards/Header',
  component: Header,
  parameters: { layout: 'centered' },
  args: {
    deckName: 'My Deck',
    deckId: 'deck-123',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
