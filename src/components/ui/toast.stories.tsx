import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

const meta = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)} variant='outline'>
          Show Toast
        </Button>
        <Toast open={open} onOpenChange={setOpen}>
          <ToastTitle>Scheduled: Catch up</ToastTitle>
          <ToastDescription>
            Friday, February 10, 2023 at 3:00 PM
          </ToastDescription>
          <ToastAction asChild altText='Goto schedule to undo'>
            <Button variant='outline' size='sm'>
              Undo
            </Button>
          </ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};
