import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Test/Simple',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='p-4 bg-blue-100 rounded'>
      <h1 className='text-xl font-bold'>Storybook is working!</h1>
      <p className='text-gray-600'>This is a simple test component.</p>
    </div>
  ),
};
