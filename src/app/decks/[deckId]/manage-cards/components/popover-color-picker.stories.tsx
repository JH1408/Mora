import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PopoverColorPicker from './popover-color-picker';

const meta = {
  title: 'ManageCards/PopoverColorPicker',
  component: PopoverColorPicker,
  parameters: { layout: 'centered' },
  args: {
    color: '#7c3aed',
    onChange: (c: string) => console.log('color', c),
  },
} satisfies Meta<typeof PopoverColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
