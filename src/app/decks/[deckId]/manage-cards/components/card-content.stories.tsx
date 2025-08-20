import type { Card } from '@prisma/client';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CardContentComponent from './card-content';

const baseCard: Card = {
  id: 'c1',
  deckId: 'd1',
  frontText: 'こんにちは',
  backText: 'Hello',
  phoneticSpelling: 'Konnichiwa',
  usageContext: 'A common Japanese greeting used during the day.',
  handwritingData: null,
  handwritingImage: null,
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const meta = {
  title: 'ManageCards/CardContent',
  component: CardContentComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    card: baseCard,
    setEditingCardId: (id: string) => console.log('edit', id),
    deleteCard: (id: string) => console.log('delete', id),
    isDeletingCard: false,
    fontClass: '',
  },
} satisfies Meta<typeof CardContentComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const WithHandwriting: Story = {
  args: {
    card: { ...baseCard, handwritingImage: '/images/mora_logo.png' },
  },
};
