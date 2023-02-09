import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Checkbox} from './checkbox';
import {CheckboxGroup} from './checkbox-group';

export default {
  title: 'Common/Checkbox Group',
  component: CheckboxGroup,
} as ComponentMeta<typeof CheckboxGroup>;

const Template: ComponentStory<typeof CheckboxGroup> = args => {
  return (
    <div className="p-10 overflow-visible">
      <CheckboxGroup orientation="vertical" label="Favorite sports" {...args}>
        <Checkbox value="Football">Football</Checkbox>
        <Checkbox value="Basketball">Basketball</Checkbox>
        <Checkbox value="Baseball">Baseball</Checkbox>
      </CheckboxGroup>
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

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
};
