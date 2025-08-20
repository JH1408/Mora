import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DeleteDeck from './delete-deck';

const meta = {
  title: 'ManageCards/DeleteDeck',
  component: DeleteDeck,
  parameters: { layout: 'centered' },
  args: {
    onDeleteDeck: () => console.log('delete deck'),
    isDeletingDeck: false,
  },
} satisfies Meta<typeof DeleteDeck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Deleting: Story = {
  args: { isDeletingDeck: true },
};
