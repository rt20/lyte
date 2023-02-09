import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {useForm} from 'react-hook-form';
import {FormTextField, TextField} from './text-field';
import {Button} from '../../../buttons/button';
import {DeleteIcon} from '../../../../icons/material/Delete';
import {EditIcon} from '../../../../icons/material/Edit';
import {Form} from '../../form';

export default {
  title: 'Common/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = args => {
  return (
    <TextField
      name="hi"
      description="Description for the field"
      label="Label"
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const TextArea = Template.bind({});
TextArea.args = {
  inputElementType: 'textarea',
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  defaultValue: 'Default value',
};

export const Value = Template.bind({});
Value.args = {
  defaultValue: 'Value',
};

export const Error = Template.bind({});
Error.args = {
  errorMessage: <span>Error message</span>,
  invalid: true,
};

export const StartAppend = Template.bind({});
StartAppend.args = {
  startAppend: (
    <Button variant="flat" color="primary" size="sm">
      Start
    </Button>
  ),
};

export const EndAppend = Template.bind({});
EndAppend.args = {
  endAppend: (
    <Button variant="flat" color="primary" size="sm">
      End
    </Button>
  ),
};

export const StartAdornment = Template.bind({});
StartAdornment.args = {
  startAdornment: <DeleteIcon />,
};

export const EndAdornment = Template.bind({});
EndAdornment.args = {
  endAdornment: <EditIcon />,
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
  autoFocus: true,
};

export function InsideForm() {
  const form = useForm({defaultValues: {name: ''}});
  return (
    <Form
      form={form}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <FormTextField label="Test" name="name" minLength={5} required />
      <Button className="mt-20" color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
