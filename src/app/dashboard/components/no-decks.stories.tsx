import type { Meta, StoryObj } from '@storybook/react';
import NoDecks from './no-decks';

const meta = {
  title: 'Dashboard/NoDecks',
  component: NoDecks,
  parameters: { layout: 'centered' },
  args: {
    setIsCreateModalOpen: (open: boolean) =>
      console.log('set modal open', open),
  },
} satisfies Meta<typeof NoDecks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
