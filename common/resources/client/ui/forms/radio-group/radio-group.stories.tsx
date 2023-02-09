import React, {cloneElement, Fragment} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {useForm} from 'react-hook-form';
import {FormRadio, Radio} from './radio';
import {FormRadioGroup, RadioGroup} from './radio-group';
import {Form} from '../form';
import {InputSize} from '../input-field/input-size';
import {Button} from '../../buttons/button';

export default {
  title: 'Common/Radio Group',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = args => {
  return (
    <div className="p-10 overflow-visible">
      <RadioGroup {...args} label="Group label">
        <Radio value="One">One</Radio>
        <Radio value="Two">Two</Radio>
        <Radio value="Three">Three</Radio>
      </RadioGroup>
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

export const Sizes = () => {
  const radioGroup = (
    <RadioGroup>
      <Radio value="One">One</Radio>
      <Radio value="Two">Two</Radio>
      <Radio value="Three">Three</Radio>
    </RadioGroup>
  );
  const sizes: InputSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  return (
    <div className="flex flex-col gap-20">
      {sizes.map(size => {
        return cloneElement(radioGroup, {size, key: size});
      })}
    </div>
  );
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Invalid = () => {
  return (
    <div className="p-10 overflow-visible">
      <RadioGroup>
        <Radio value="One" invalid>
          One
        </Radio>
        <Radio value="Two">Two</Radio>
        <Radio value="Three">Three</Radio>
      </RadioGroup>
    </div>
  );
};

export const InsideForm = () => {
  const form = useForm({
    defaultValues: {
      number: 'Two',
    },
  });

  const setError = () => {
    form.setError('number', {message: 'Error for the group'});
  };

  return (
    <Fragment>
      <Form onSubmit={() => {}} form={form} className="p-10 overflow-visible">
        <FormRadioGroup name="number">
          <FormRadio value="One">One</FormRadio>
          <FormRadio value="Two">Two</FormRadio>
          <FormRadio value="Three">Three</FormRadio>
        </FormRadioGroup>
      </Form>
      <Button onClick={setError}>Set Error</Button>
    </Fragment>
  );
};

export const AutoFocus = () => {
  return (
    <div className="p-10 overflow-visible">
      <RadioGroup>
        <Radio value="One">One</Radio>
        <Radio value="Two" autoFocus>
          Two
        </Radio>
        <Radio value="Three">Three</Radio>
      </RadioGroup>
    </div>
  );
};
