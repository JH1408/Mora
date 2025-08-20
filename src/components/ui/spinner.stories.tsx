import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Spinner from './spinner';

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  args: {
    className: '',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
