import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import UsageContext from './usage-context';

const meta = {
  title: 'Study/UsageContext',
  component: UsageContext,
  parameters: {
    layout: 'centered',
  },
  args: {
    usageContext: 'I drink water every day to stay hydrated.',
  },
} satisfies Meta<typeof UsageContext>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithContent: Story = {};

export const Empty: Story = {
  args: {
    usageContext: null,
  },
};
