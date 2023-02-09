import React, {useRef, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ProgressCircle} from './progress-circle';
import {Button} from '../buttons/button';

export default {
  title: 'Common/ProgressCircle',
  component: ProgressCircle,
} as ComponentMeta<typeof ProgressCircle>;

const Template: ComponentStory<typeof ProgressCircle> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ProgressCircle value={40} {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Value50 = Template.bind({});
Value50.args = {
  value: 50,
};

export const Value100 = Template.bind({});
Value100.args = {
  value: 100,
};

export const Sizes = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-20">
      <ProgressCircle value={40} size="sm" />
      <ProgressCircle value={40} size="md" />
      <ProgressCircle value={40} size="lg" />
    </div>
  );
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  isIndeterminate: true,
};

export const IndeterminateSizes = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-20">
      <ProgressCircle isIndeterminate size="sm" />
      <ProgressCircle isIndeterminate size="md" />
      <ProgressCircle isIndeterminate size="lg" />
    </div>
  );
};

export const SimulatedProgress = () => {
  const [value, setValue] = useState(0);
  const intervalTimer = useRef<any>();

  const toggleProgress = (speed = 200) => {
    clearInterval(intervalTimer.current);
    intervalTimer.current = setInterval(() => {
      setValue(prevValue => {
        const newValue = Math.min(100, prevValue + 5);
        if (newValue === 100) {
          clearInterval(intervalTimer.current);
        }
        return newValue;
      });
    }, speed);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-20">
      <ProgressCircle value={value} size="lg" />
      <div className="flex items-center gap-10">
        <Button
          variant="flat"
          color="chip"
          onClick={() => {
            setValue(0);
            clearInterval(intervalTimer.current);
          }}
        >
          Clear
        </Button>
        <Button variant="flat" color="chip" onClick={() => toggleProgress(30)}>
          Fast
        </Button>
        <Button variant="flat" color="chip" onClick={() => toggleProgress(100)}>
          Medium
        </Button>
        <Button variant="flat" color="chip" onClick={() => toggleProgress(200)}>
          Slow
        </Button>
      </div>
    </div>
  );
};
