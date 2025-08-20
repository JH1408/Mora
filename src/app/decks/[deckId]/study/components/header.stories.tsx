import type { Meta, StoryObj } from '@storybook/react';
import Header from './header';
import { STUDY_MODES } from '@/utils/types/studySession';

const meta = {
  title: 'Study/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', minWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    deckName: 'Japanese N5',
    studyMode: STUDY_MODES.RECOGNITION,
    toggleStudyMode: () => console.log('toggle study mode'),
    endStudySession: () => console.log('end study session'),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recognition: Story = {};

export const Recall: Story = {
  args: {
    studyMode: STUDY_MODES.RECALL,
  },
};
