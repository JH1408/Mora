import type { Meta, StoryObj } from '@storybook/react';
import CtaSection from './cta-section';

const meta = {
  title: 'Home/CTA Section',
  component: CtaSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CtaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
