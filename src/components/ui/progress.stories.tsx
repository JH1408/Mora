import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta = {
  title: 'UI/Progress',
  component: Progress,
  args: {
    value: 50,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ProgressValues: Story = {
  render: (args) => (
    <div className='space-y-4 w-full max-w-md'>
      <div>
        <div className='flex justify-between text-sm mb-2'>
          <span>25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div>
        <div className='flex justify-between text-sm mb-2'>
          <span>50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div>
        <div className='flex justify-between text-sm mb-2'>
          <span>75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div>
        <div className='flex justify-between text-sm mb-2'>
          <span>100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
};
