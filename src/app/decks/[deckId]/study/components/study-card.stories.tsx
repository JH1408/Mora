import type { Meta, StoryObj } from '@storybook/react';
import StudyCard from './study-card';
import { STUDY_MODES } from '@/utils/types/studySession';
import type { StudyCard as StudyCardType } from '@/utils/types/deck';

const demoCard: StudyCardType = {
  id: '1',
  backText: 'こんにちは',
  frontText: 'Hello',
  phoneticSpelling: 'Kon-ni-chi-wa',
  handwritingImage: undefined,
  createdAt: new Date().toISOString(),
};

const meta = {
  title: 'Study/StudyCard',
  component: StudyCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isFlipped: false,
    setIsFlipped: (v: boolean) => console.log('setIsFlipped', v),
    studyMode: STUDY_MODES.RECOGNITION,
    currentCard: demoCard,
    speakText: (t: string) => console.log('speak', t),
    fontClass: '',
    onSwipeLeft: () => console.log('swipe left'),
    onSwipeRight: () => console.log('swipe right'),
    hasBeenFlipped: false,
  },
} satisfies Meta<typeof StudyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FrontRecognition: Story = {};

export const BackRecognition: Story = {
  args: {
    isFlipped: true,
    hasBeenFlipped: true,
  },
};

export const WithHandwritingImage: Story = {
  args: {
    isFlipped: true,
    hasBeenFlipped: true,
    currentCard: {
      ...demoCard,
      handwritingImage: '/images/mora_logo.png',
    },
  },
};
