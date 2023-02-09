import {ComponentMeta, ComponentStory} from '@storybook/react';
import {RangeSlider} from './range-slider';

export default {
  title: 'Common/RangeSlider',
  component: RangeSlider,
} as ComponentMeta<typeof RangeSlider>;

const Template: ComponentStory<typeof RangeSlider> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <RangeSlider className="w-320" {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Label = Template.bind({});
Label.args = {
  label: <span>Label</span>,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
  label: <span>Label</span>,
  defaultValue: {start: 20, end: 80},
};

export const HideValueLabel = Template.bind({});
HideValueLabel.args = {
  showValueLabel: false,
  label: <span>Label</span>,
  defaultValue: {start: 20, end: 80},
};

export const FormatPercent = Template.bind({});
FormatPercent.args = {
  label: <span>Label</span>,
  defaultValue: {start: 0.2, end: 0.8},
  minValue: 0,
  maxValue: 1,
  step: 0.01,
  formatOptions: {style: 'percent'},
};

export const MinMax = Template.bind({});
MinMax.args = {
  label: <span>Label</span>,
  defaultValue: {start: 20, end: 50},
  minValue: 10,
  maxValue: 70,
  step: 5,
  onChange: v => {
    console.log('change', v);
  },
};
