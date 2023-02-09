import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {endOfMonth, startOfMonth} from '@internationalized/date';
import {DateRangePicker} from './date-range-picker';
import {useCurrentDateTime} from '../../../../../i18n/use-current-date-time';

export default {
  title: 'Common/Date and Time/Date Range Picker',
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;

export const EndAndStartSet: ComponentStory<typeof DateRangePicker> = args => {
  const now = useCurrentDateTime();
  return (
    <DateRangePicker
      label="Pick a date"
      defaultValue={{
        start: startOfMonth(now),
        end: endOfMonth(now.add({months: 1})),
      }}
      {...args}
    />
  );
};

export const NoEndDate: ComponentStory<typeof DateRangePicker> = args => {
  const now = useCurrentDateTime();
  return (
    <DateRangePicker
      label="Pick a date"
      defaultValue={{start: now}}
      max={endOfMonth(now.add({months: 1}))}
      {...args}
    />
  );
};
