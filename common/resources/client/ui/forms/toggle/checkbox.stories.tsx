import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Checkbox} from './checkbox';

export default {
  title: 'Common/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = args => {
  return (
    <div className="p-10 overflow-visible">
      <Checkbox {...args}>Check me</Checkbox>
    </div>
  );
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  orientation: 'horizontal',
};

export const Vertical = Template.bind({});
Vertical.args = {
  orientation: 'vertical',
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  isIndeterminate: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
  errorMessage: 'There was an error',
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
  autoFocus: true,
};
