import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import KeyFeatures from './key-features';

const meta = {
  title: 'Home/Key Features',
  component: KeyFeatures,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof KeyFeatures>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
