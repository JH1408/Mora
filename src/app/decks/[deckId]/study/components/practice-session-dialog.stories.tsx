import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PracticeSessionDialog from './practice-session-dialog';

const meta = {
  title: 'Study/PracticeSessionDialog',
  component: PracticeSessionDialog,
  parameters: {
    layout: 'centered',
  },
  args: {
    startPracticeSession: () => console.log('start practice session'),
  },
} satisfies Meta<typeof PracticeSessionDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
