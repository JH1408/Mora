import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import {
  Header,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  HeaderDivider,
  HeaderTitle,
  HeaderSubtitle,
} from './header';

const meta = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <HeaderLeft>
          <HeaderTitle>My App</HeaderTitle>
        </HeaderLeft>
        <HeaderCenter>
          <HeaderSubtitle>Welcome back!</HeaderSubtitle>
        </HeaderCenter>
        <HeaderRight>
          <Button variant='ghost' size='sm'>
            Profile
          </Button>
          <HeaderDivider />
          <Button variant='ghost' size='sm'>
            Settings
          </Button>
        </HeaderRight>
      </>
    ),
  },
  render: (args) => <Header {...args} />,
};
