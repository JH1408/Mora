import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ErrorMessage from './error-message';

const meta = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  args: {
    message: 'Something went wrong.',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
