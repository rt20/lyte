import {useRef, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Button} from '../buttons/button';
import {ProgressBar} from './progress-bar';

export default {
  title: 'Common/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ProgressBar
        value={40}
        className="w-320"
        label={<span>Loading...</span>}
        showValueLabel
        {...args}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const LabelBottom = Template.bind({});
LabelBottom.args = {
  labelPosition: 'bottom',
};

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
    <div className="w-full h-full flex flex-col items-center justify-center gap-20 max-w-440 mx-auto">
      <ProgressBar
        value={40}
        className="w-full"
        size="xs"
        label="Loading..."
        showValueLabel
      />
      <ProgressBar
        value={40}
        className="w-full"
        size="sm"
        label="Loading..."
        showValueLabel
      />
      <ProgressBar
        value={40}
        className="w-full"
        size="md"
        label="Loading..."
        showValueLabel
      />
    </div>
  );
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  isIndeterminate: true,
};

export const IndeterminateSizes = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-20 max-w-440 mx-auto">
      <ProgressBar
        value={40}
        className="w-full"
        size="xs"
        label="Loading..."
        showValueLabel
        isIndeterminate
      />
      <ProgressBar
        value={40}
        className="w-full"
        size="sm"
        label="Loading..."
        showValueLabel
        isIndeterminate
      />
      <ProgressBar
        value={40}
        className="w-full"
        size="md"
        label="Loading..."
        showValueLabel
        isIndeterminate
      />
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
      <ProgressBar value={value} size="md" className="w-440" />
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
