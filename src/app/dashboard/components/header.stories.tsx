import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Header from './header';

const meta = {
  title: 'Dashboard/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  args: {
    userName: 'Josy',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
