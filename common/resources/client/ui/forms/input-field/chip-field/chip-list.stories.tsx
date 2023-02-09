import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {ChipValue} from './chip-field';
import {ChipList} from './chip-list';
import {Chip} from './chip';
import {Avatar} from '../../../images/avatar';

export default {
  title: 'Common/ChipList',
  component: ChipList,
} as ComponentMeta<typeof ChipList>;

const people: ChipValue[] = [...Array(5).keys()].map(() => {
  return {
    id: faker.datatype.number(1000),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.internet.email(),
    image: faker.image.avatar(),
    model_type: 'user',
  };
});

export const Sizes: ComponentStory<typeof ChipList> = () => {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const;
  return (
    <div>
      {sizes.map(size => {
        return (
          <ChipList size={size} key={size} className="mb-20">
            {people.map(person => (
              <Chip key={person.id} adornment={<Avatar src={person.image} />}>
                {person.name}
              </Chip>
            ))}
          </ChipList>
        );
      })}
    </div>
  );
};

export const Colors: ComponentStory<typeof ChipList> = () => {
  const colors = ['chip', 'primary', 'positive', 'danger'] as const;
  return (
    <div className="flex w-full h-full items-center justify-center gap-14">
      {colors.map(color => {
        return (
          <ChipList color={color} key={color} className="mb-20">
            <Chip className="min-w-80 capitalize">{color}</Chip>
          </ChipList>
        );
      })}
    </div>
  );
};

export const Invalid: ComponentStory<typeof ChipList> = () => {
  return (
    <ChipList className="mb-20">
      {people.map(person => (
        <Chip key={person.id} invalid adornment={<Avatar src={person.image} />}>
          {person.name}
        </Chip>
      ))}
    </ChipList>
  );
};

export const ErrorMessage: ComponentStory<typeof ChipList> = () => {
  return (
    <ChipList className="mb-20">
      {people.map(person => (
        <Chip
          key={person.id}
          errorMessage="Chip is invalid"
          adornment={<Avatar src={person.image} />}
        >
          {person.name}
        </Chip>
      ))}
    </ChipList>
  );
};
