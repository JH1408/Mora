import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Search } from 'lucide-react';

import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Click me',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className='flex gap-3 flex-wrap'>
      <Button {...args} variant='default'>
        Default
      </Button>
      <Button {...args} variant='secondary'>
        Secondary
      </Button>
      <Button {...args} variant='accent'>
        Accent
      </Button>
      <Button {...args} variant='gradient'>
        Gradient
      </Button>
      <Button {...args} variant='destructive'>
        Destructive
      </Button>
      <Button {...args} variant='outline'>
        Outline
      </Button>
      <Button {...args} variant='outline-secondary'>
        Outline Secondary
      </Button>
      <Button {...args} variant='outline-accent'>
        Outline Accent
      </Button>
      <Button {...args} variant='ghost'>
        Ghost
      </Button>
      <Button {...args} variant='ghost-secondary'>
        Ghost Secondary
      </Button>
      <Button {...args} variant='ghost-accent'>
        Ghost Accent
      </Button>
      <Button {...args} variant='ghost-destructive'>
        Ghost Destructive
      </Button>
      <Button {...args} variant='link'>
        Link
      </Button>
      <Button {...args} variant='soft'>
        Soft
      </Button>
      <Button {...args} variant='soft-secondary'>
        Soft Secondary
      </Button>
      <Button {...args} variant='soft-accent'>
        Soft Accent
      </Button>
      <Button {...args} variant='soft-success'>
        Soft Success
      </Button>
      <Button {...args} variant='soft-destructive'>
        Soft Destructive
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className='flex items-center gap-3 flex-wrap'>
      <Button {...args} size='xs'>
        XS
      </Button>
      <Button {...args} size='sm'>
        SM
      </Button>
      <Button {...args} size='default'>
        Default
      </Button>
      <Button {...args} size='lg'>
        LG
      </Button>
      <Button {...args} size='xl'>
        XL
      </Button>
      <Button {...args} size='xl-2'>
        XL-2
      </Button>
      <Button {...args} size='xl-3'>
        XL-3
      </Button>
    </div>
  ),
};

export const IconButtons: Story = {
  render: (args) => (
    <div className='flex items-center gap-3 flex-wrap'>
      <Button {...args} size='icon-sm'>
        <Search className='size-4' />
      </Button>
      <Button {...args} size='icon'>
        <Search className='size-4' />
      </Button>
      <Button {...args} size='icon-lg'>
        <Search className='size-4' />
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className='flex gap-3 flex-wrap'>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} variant='secondary' disabled>
        Disabled Secondary
      </Button>
      <Button {...args} variant='destructive' disabled>
        Disabled Destructive
      </Button>
    </div>
  ),
};
