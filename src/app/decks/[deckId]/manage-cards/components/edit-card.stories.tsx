import type { Card } from '@prisma/client';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import EditCardForm from './edit-card';

const card: Card = {
  id: 'c1',
  deckId: 'd1',
  frontText: '猫',
  backText: 'Cat',
  phoneticSpelling: 'neko',
  usageContext: '猫はかわいいです。',
  handwritingData: null,
  handwritingImage: null,
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const meta = {
  title: 'ManageCards/EditCardForm',
  component: EditCardForm,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', minWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    card,
    onSave: (updated: Partial<Card>) => console.log('save', updated),
    onCancel: () => console.log('cancel'),
    isUpdatingCard: false,
    fontClass: '',
  },
} satisfies Meta<typeof EditCardForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Updating: Story = {
  args: { isUpdatingCard: true },
};
