import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { toast } from 'sonner';

import { Button } from './button';
import { Toaster } from './sonner';

const meta = {
  title: 'UI/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex gap-2 flex-wrap'>
        <Button onClick={() => toast('My first toast')} variant='outline'>
          Default Toast
        </Button>
        <Button onClick={() => toast.success('Success!')} variant='outline'>
          Success Toast
        </Button>
        <Button onClick={() => toast.error('Error!')} variant='outline'>
          Error Toast
        </Button>
        <Button
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: 'Loading...',
              success: 'Success!',
              error: 'Error!',
            })
          }
          variant='outline'
        >
          Promise Toast
        </Button>
      </div>
      <Toaster />
    </div>
  ),
};
