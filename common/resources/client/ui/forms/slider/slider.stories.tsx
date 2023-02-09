import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Slider} from './slider';

export default {
  title: 'Common/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Slider className="w-320" {...args} />
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
  defaultValue: 50,
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  label: (
    <span>
      This is a very long label for a narrow slider, it should overflow
    </span>
  ),
  defaultValue: 50,
};

export const HideValueLabel = Template.bind({});
HideValueLabel.args = {
  showValueLabel: false,
  label: <span>Label</span>,
  defaultValue: 50,
};

export const FormatPercent = Template.bind({});
FormatPercent.args = {
  label: <span>Label</span>,
  defaultValue: 0.5,
  minValue: 0,
  maxValue: 1,
  step: 0.01,
  formatOptions: {style: 'percent'},
};

export const MinMax = Template.bind({});
MinMax.args = {
  label: <span>Label</span>,
  defaultValue: 20,
  minValue: 10,
  maxValue: 70,
  step: 5,
};
