import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className='flex gap-2 flex-wrap'>
      <Badge {...args} variant='default'>
        Default
      </Badge>
      <Badge {...args} variant='secondary'>
        Secondary
      </Badge>
      <Badge {...args} variant='accent'>
        Accent
      </Badge>
      <Badge {...args} variant='destructive'>
        Destructive
      </Badge>
      <Badge {...args} variant='outline'>
        Outline
      </Badge>
      <Badge {...args} variant='success'>
        Success
      </Badge>
      <Badge {...args} variant='warning'>
        Warning
      </Badge>
      <Badge {...args} variant='info'>
        Info
      </Badge>
      <Badge {...args} variant='neutral'>
        Neutral
      </Badge>
    </div>
  ),
};
