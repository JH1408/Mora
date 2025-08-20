import type { Meta, StoryObj } from '@storybook/react';
import CanvasModal from './canvas-modal';

const meta = {
  title: 'ManageCards/CanvasModal',
  component: CanvasModal,
  parameters: {
    layout: 'centered',
  },
  args: {
    isOpen: true,
    onClose: () => console.log('close'),
    onSave: (data: { json: string; imageData: string }) =>
      console.log('save', data),
    handwritingData: null,
  },
} satisfies Meta<typeof CanvasModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
