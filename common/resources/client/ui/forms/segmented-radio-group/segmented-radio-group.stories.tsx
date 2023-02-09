import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {SegmentedRadioGroup} from './segmented-radio-group';
import {SegmentedRadio} from './segmented-radio';

export default {
  title: 'Common/Segmented Radio Group',
  component: SegmentedRadioGroup,
} as ComponentMeta<typeof SegmentedRadioGroup>;

const Template: ComponentStory<typeof SegmentedRadioGroup> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SegmentedRadioGroup defaultValue="Two">
        <SegmentedRadio value="One">One</SegmentedRadio>
        <SegmentedRadio value="Two">Two</SegmentedRadio>
        <SegmentedRadio value="Three">Three</SegmentedRadio>
      </SegmentedRadioGroup>
    </div>
  );
};

export const Default = Template.bind({});

export const Sizes = () => {
  return (
    <div className="w-full h-full flex flex-col gap-20 items-center justify-center">
      <SegmentedRadioGroup size="xs">
        <SegmentedRadio value="One">One</SegmentedRadio>
        <SegmentedRadio value="Two">Two</SegmentedRadio>
        <SegmentedRadio value="Three">Three</SegmentedRadio>
      </SegmentedRadioGroup>
      <SegmentedRadioGroup size="sm">
        <SegmentedRadio value="One">One</SegmentedRadio>
        <SegmentedRadio value="Two">Two</SegmentedRadio>
        <SegmentedRadio value="Three">Three</SegmentedRadio>
      </SegmentedRadioGroup>
      <SegmentedRadioGroup size="md">
        <SegmentedRadio value="One">One</SegmentedRadio>
        <SegmentedRadio value="Two">Two</SegmentedRadio>
        <SegmentedRadio value="Three">Three</SegmentedRadio>
      </SegmentedRadioGroup>
      <SegmentedRadioGroup size="lg">
        <SegmentedRadio value="One">One</SegmentedRadio>
        <SegmentedRadio value="Two">Two</SegmentedRadio>
        <SegmentedRadio value="Three">Three</SegmentedRadio>
      </SegmentedRadioGroup>
    </div>
  );
};
