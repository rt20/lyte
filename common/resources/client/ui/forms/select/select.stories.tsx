import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {Option, OptionGroup, Select} from './select';
import {NormalizedModel} from '../../../datatable/filters/normalized-model';
import {Avatar} from '../../images/avatar';

export default {
  title: 'Common/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const people: NormalizedModel[] = [...Array(20).keys()].map(() => {
  return {
    id: faker.datatype.number(100000),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.internet.email(),
    image: faker.image.avatar(),
    model_type: 'user',
  };
});

const groupedPeople = [
  {
    label: 'First',
    items: people.slice(0, 3),
  },
  {
    label: 'Second',
    items: people.slice(3, 6),
  },
  {
    label: 'Third',
    items: people.slice(6, 9),
  },
];

const Template: ComponentStory<typeof Select> = args => {
  return (
    <Select label="Some Label" {...args}>
      {groupedPeople.map(group => (
        <OptionGroup key={group.label} label={group.label}>
          {group.items.map(item => (
            <Option
              key={item.id}
              value={item.id}
              description={item.description}
              startIcon={<Avatar src={item.image} />}
            >
              {item.name}
            </Option>
          ))}
        </OptionGroup>
      ))}
    </Select>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
  autoFocus: true,
};

export const ControlledValue = Template.bind({});
ControlledValue.args = {
  selectedValue: groupedPeople[0].items[0].id,
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  defaultSelectedValue: groupedPeople[0].items[1].id,
};
