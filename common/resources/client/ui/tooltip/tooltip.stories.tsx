import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Tooltip} from './tooltip';
import {Button} from '../buttons/button';

export default {
  title: 'Common/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const SingleTemplate: ComponentStory<typeof Tooltip> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Tooltip {...args} label="Tooltip message">
        <Button variant="outline" color="primary">
          Trigger
        </Button>
      </Tooltip>
    </div>
  );
};

const MultipleTemplate: ComponentStory<typeof Tooltip> = args => {
  return (
    <div className="flex flex-col gap-20 w-full h-full items-center justify-center">
      <Tooltip {...args} label="Neutral message" variant="neutral">
        <Button variant="outline" color="primary">
          Neutral tooltip
        </Button>
      </Tooltip>
      <Tooltip {...args} label="Success message" variant="positive">
        <Button variant="outline" color="primary">
          Success tooltip
        </Button>
      </Tooltip>
      <Tooltip {...args} label="Error message" variant="danger">
        <Button variant="outline" color="primary">
          Error tooltip
        </Button>
      </Tooltip>
    </div>
  );
};

export const Neutral = SingleTemplate.bind({});
Neutral.args = {};

export const Success = SingleTemplate.bind({});
Success.args = {
  variant: 'positive',
};

export const Error = SingleTemplate.bind({});
Error.args = {
  variant: 'danger',
};

export const MultipleTooltips = MultipleTemplate.bind({});
export const MultipleTooltipsZeroDelay = MultipleTemplate.bind({});
MultipleTooltipsZeroDelay.args = {
  delay: 0,
};

export const TriggerDisabled = () => {
  return (
    <Tooltip label="Neutral message" variant="neutral">
      <Button variant="outline" color="primary" disabled>
        Trigger disabled
      </Button>
    </Tooltip>
  );
};

export const TooltipFlipAtEdge = () => {
  return (
    <Tooltip label="Message" variant="neutral">
      <Button variant="outline" color="primary">
        Trigger
      </Button>
    </Tooltip>
  );
};
