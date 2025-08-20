import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from './card';
import { Button } from './button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card className='w-[360px]'>
      <CardHeader className='border-b'>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
        <CardAction>
          <Button size='sm'>Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This is the main body of the card.</p>
      </CardContent>
      <CardFooter className='border-t'>
        <Button variant='secondary' size='sm'>
          Secondary
        </Button>
      </CardFooter>
    </Card>
  ),
};
