import type { Card } from '@prisma/client';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DeleteCard from './delete-card';

const card: Card = {
  id: 'c1',
  deckId: 'd1',
  frontText: '水',
  backText: 'Water',
  phoneticSpelling: 'mizu',
  usageContext: '水を飲みます。',
  handwritingData: null,
  handwritingImage: null,
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const meta = {
  title: 'ManageCards/DeleteCard',
  component: DeleteCard,
  parameters: { layout: 'centered' },
  args: {
    card,
    deleteCard: (id: string) => console.log('delete', id),
    isDeletingCard: false,
  },
} satisfies Meta<typeof DeleteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Deleting: Story = {
  args: { isDeletingCard: true },
};
