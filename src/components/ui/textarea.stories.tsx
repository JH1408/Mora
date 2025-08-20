import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Textarea } from './textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  args: {
    placeholder: 'Type your message here...',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is a textarea with some content.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'This textarea is disabled.',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Invalid textarea',
  },
};
