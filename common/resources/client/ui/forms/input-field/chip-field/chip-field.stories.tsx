import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {faker} from '@faker-js/faker';
import {ChipField, ChipValue} from './chip-field';
import {NormalizedModel} from '../../../../datatable/filters/normalized-model';
import {Avatar} from '../../../images/avatar';
import {Section} from '../../listbox/section';
import {Item} from '../../listbox/item';

export default {
  title: 'Common/ChipField',
  component: ChipField,
} as ComponentMeta<typeof ChipField>;

const people: NormalizedModel[] = [...Array(20).keys()].map(() => {
  return {
    id: faker.datatype.number(1000),
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

const Template: ComponentStory<typeof ChipField> = args => {
  const [value, setValue] = useState<ChipValue[]>([]);
  return (
    <ChipField
      {...args}
      suggestions={people}
      value={value}
      onChange={setValue}
      label="Some Label"
    >
      {item => (
        <Item
          key={item.id}
          value={item.id}
          startIcon={<Avatar src={item.image} />}
          description={item.description}
        >
          {item.name}
        </Item>
      )}
    </ChipField>
  );
};

const AsyncDataTemplate: ComponentStory<typeof ChipField> = args => {
  const [value, setValue] = useState<ChipValue[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const {isLoading, data} = useQuery(
    ['example-users', inputValue],
    () => {
      return axios
        .get(`https://reqres.in/api/users?per_page=40&query=${inputValue}`)
        .then(r => {
          return r.data.data.map((item: any) => {
            return {
              id: item.id,
              name: `${item.first_name} ${item.last_name}`,
              description: item.email,
              image: item.avatar,
            };
          });
        });
    },
    {staleTime: 0}
  );

  return (
    <ChipField
      {...args}
      suggestions={data || []}
      isLoading={isLoading}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      value={value}
      onChange={setValue}
      label="Some Label"
    >
      {(item: NormalizedModel) => (
        <Item
          key={item.id}
          value={item.id}
          startIcon={<Avatar src={item.image} />}
          description={item.description}
        >
          {item.name}
        </Item>
      )}
    </ChipField>
  );
};

const SectionsTemplate: ComponentStory<typeof ChipField> = args => {
  const [value, setValue] = useState<ChipValue[]>([]);
  return (
    <ChipField
      {...args}
      suggestions={groupedPeople}
      value={value}
      onChange={setValue}
      label="Some Label"
    >
      {section => (
        <Section label={section.label} key={section.label}>
          {section.items.map(item => {
            return (
              <Item
                key={item.id}
                value={item.id}
                startIcon={<Avatar src={item.image} />}
                description={item.description}
              >
                {item.name}
              </Item>
            );
          })}
        </Section>
      )}
    </ChipField>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const EmptyMessage = Template.bind({});
EmptyMessage.args = {
  showEmptyMessage: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const AsyncData = AsyncDataTemplate.bind({});
AsyncData.args = {};

export const Sections = SectionsTemplate.bind({});
Sections.args = {};
