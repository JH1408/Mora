import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from './select';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder='Choose an option' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='one'>One</SelectItem>
        <SelectItem value='two'>Two</SelectItem>
        <SelectItem value='three'>Three</SelectItem>
      </SelectContent>
    </Select>
  ),
};
