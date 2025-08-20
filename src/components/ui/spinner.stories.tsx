import type { Meta, StoryObj } from '@storybook/react';
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
