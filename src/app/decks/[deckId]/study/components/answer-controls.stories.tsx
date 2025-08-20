import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import AnswerControls from './answer-controls';

const meta = {
  title: 'Study/AnswerControls',
  component: AnswerControls,
  parameters: {
    layout: 'centered',
  },
  args: {
    hasBeenFlipped: true,
    handleStudyResult: (isCorrect: boolean) =>
      console.log('Study result:', isCorrect),
  },
} satisfies Meta<typeof AnswerControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Shown: Story = {};
