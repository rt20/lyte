import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {useForm} from 'react-hook-form';
import {FormSwitch, Switch} from './switch';
import {Form} from '../form';
import {Button} from '../../buttons/button';

export default {
  title: 'Common/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = args => {
  return (
    <div className="p-10 overflow-visible">
      <Switch {...args}>Switch me</Switch>
    </div>
  );
};

export const Description = Template.bind({});
Description.args = {
  description: faker.lorem.sentence(),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
};

export const InsideForm = () => {
  const form = useForm({defaultValues: {switch: true}});
  return (
    <Form
      form={form}
      onSubmit={value => {
        console.log(value);
      }}
    >
      <FormSwitch name="switch">Toggle me</FormSwitch>
      <Button type="submit" variant="flat" color="primary" className="mt-20">
        Submit
      </Button>
    </Form>
  );
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
  autoFocus: true,
};
