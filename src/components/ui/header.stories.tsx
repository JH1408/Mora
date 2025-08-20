import type { Meta, StoryObj } from '@storybook/react';
import {
  Header,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  HeaderDivider,
  HeaderTitle,
  HeaderSubtitle,
} from './header';
import { Button } from './button';

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
  render: () => (
    <Header>
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
    </Header>
  ),
};

export const WithMaxWidth: Story = {
  render: () => (
    <Header maxWidth='lg'>
      <HeaderLeft>
        <HeaderTitle>My App</HeaderTitle>
      </HeaderLeft>
      <HeaderRight>
        <Button variant='ghost' size='sm'>
          Profile
        </Button>
      </HeaderRight>
    </Header>
  ),
};
