import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Button} from './button';
import {ButtonColor} from './get-shared-button-style';

export default {
  title: 'Common/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => {
  return (
    <>
      <ButtonRow args={args} color="primary" />
      <ButtonRow args={args} color="danger" />
      <ButtonRow args={args} color="chip" />
      <ButtonRow args={args} color="paper" />
      <ButtonRow args={args} color={null} />
    </>
  );
};

interface ButtonRowProps {
  color: ButtonColor;
  args: any;
}
function ButtonRow({args, color}: ButtonRowProps) {
  return (
    <div className="mb-20 flex items-center gap-20">
      <Button {...args} color={color} disabled size="md">
        Disabled
      </Button>
      <Button {...args} color={color} size="xl">
        Extra large
      </Button>
      <Button {...args} color={color} size="lg">
        Large
      </Button>
      <Button {...args} color={color} size="md">
        Medium
      </Button>
      <Button {...args} color={color} size="sm">
        Small
      </Button>
      <Button {...args} color={color} size="xs">
        Extra small
      </Button>
    </div>
  );
}

export const Flat = Template.bind({});
Flat.args = {
  variant: 'flat',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
};

export const Raised = Template.bind({});
Raised.args = {
  variant: 'raised',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
};
