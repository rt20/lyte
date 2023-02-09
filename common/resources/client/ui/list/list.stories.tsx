import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {List, ListItem} from './list';
import {PersonIcon} from '../../icons/material/Person';

const names = [
  faker.name.fullName(),
  faker.name.fullName(),
  faker.name.fullName(),
  faker.name.fullName(),
];

export default {
  title: 'Common/List',
  component: List,
} as ComponentMeta<typeof List>;

export const Selection: ComponentStory<typeof List> = () => {
  const [value, setValue] = useState(1);
  return (
    <List>
      <ListItem isSelected={value === 1} onSelected={() => setValue(1)}>
        {names[0]}
      </ListItem>
      <ListItem isSelected={value === 2} onSelected={() => setValue(2)}>
        {names[1]}
      </ListItem>
      <ListItem isSelected={value === 3} onSelected={() => setValue(3)}>
        {names[2]}
      </ListItem>
      <ListItem isSelected={value === 4} onSelected={() => setValue(4)}>
        {names[3]}
      </ListItem>
    </List>
  );
};

export const DisabledItem: ComponentStory<typeof List> = () => {
  const [value, setValue] = useState(1);
  return (
    <List>
      <ListItem
        startIcon={<PersonIcon />}
        isSelected={value === 1}
        isDisabled
        onSelected={() => setValue(1)}
      >
        {names[0]}
      </ListItem>
      <ListItem isSelected={value === 2} onSelected={() => setValue(2)}>
        {names[1]}
      </ListItem>
      <ListItem isSelected={value === 3} onSelected={() => setValue(3)}>
        {names[2]}
      </ListItem>
      <ListItem isSelected={value === 4} onSelected={() => setValue(4)}>
        {names[3]}
      </ListItem>
    </List>
  );
};
