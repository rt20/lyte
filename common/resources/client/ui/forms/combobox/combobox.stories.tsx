import React, {useEffect, useRef, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {useForm} from 'react-hook-form';
import {ComboBox, Option} from './combobox';
import {Form} from '../form';
import {FormComboBox} from './form-combobox';
import {NormalizedModel} from '../../../datatable/filters/normalized-model';
import {faker} from '@faker-js/faker';
import {Item} from '../listbox/item';
import {Avatar} from '../../images/avatar';

const getSampleData = (amount = 20): NormalizedModel[] => {
  return [...Array(amount).keys()].map(() => {
    return {
      id: faker.datatype.number(100000),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      description: faker.internet.email(),
      image: faker.image.avatar(),
      model_type: 'user',
    };
  });
};

export default {
  title: 'Common/Combobox',
  component: ComboBox,
} as ComponentMeta<typeof ComboBox>;

const Template: ComponentStory<typeof ComboBox> = args => {
  return (
    <ComboBox label="Some Label" {...args}>
      {films.map(({name, icon}) => (
        <Option
          key={name}
          value={name}
          description="something"
          startIcon={
            icon && (
              <img className="w-32 h-32 rounded" alt="Poster" src={icon} />
            )
          }
        >
          {name}
        </Option>
      ))}
    </ComboBox>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const EmptyMessage = Template.bind({});
EmptyMessage.args = {
  isAsync: true,
  showEmptyMessage: true,
};

export const LoadingItems = () => {
  const [items, setItems] = useState(getSampleData());
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timeout.current);
    setIsLoading(true);
    timeout.current = setTimeout(() => {
      setItems(getSampleData());
      setIsLoading(false);
    }, 500);
  }, [value]);

  return (
    <ComboBox
      async={true}
      isLoading={isLoading}
      items={items}
      selectionMode="single"
      inputValue={value}
      onInputValueChange={setValue}
    >
      {item => (
        <Item
          value={item.id}
          key={item.id}
          description={item.description}
          startIcon={<Avatar src={item.image} />}
        >
          {item.name}
        </Item>
      )}
    </ComboBox>
  );
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
  autoFocus: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const DontOpenMenuOnFocus = Template.bind({});
DontOpenMenuOnFocus.args = {
  openMenuOnFocus: false,
};

export const InsideForm = () => {
  const form = useForm({
    defaultValues: {test: 'one'},
  });
  const value = form.watch();
  return (
    <Form form={form} onSubmit={() => {}}>
      <FormComboBox name="test">
        <Item value="one">one</Item>
        <Item value="two">two</Item>
        <Item value="three">three</Item>
      </FormComboBox>
    </Form>
  );
};

export const AllowCustomValue = () => {
  const form = useForm();
  const value = form.watch();
  return (
    <Form form={form} onSubmit={() => {}}>
      <FormComboBox allowCustomValue name="test">
        <Item value="one">one</Item>
        <Item value="two">two</Item>
        <Item value="three">three</Item>
      </FormComboBox>
    </Form>
  );
};

const films = [
  {
    name: 'Toy Story',
    icon: 'https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg',
    decade: '1990s',
  },
  {
    name: 'A Bugs Life',
    icon: 'https://upload.wikimedia.org/wikipedia/en/c/cc/A_Bug%27s_Life.jpg',
    decade: '1990s',
  },
  {
    name: 'Toy Story 2',
    icon: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Toy_Story_2.jpg',
    decade: '1990s',
  },
  {
    name: 'Monsters, Inc.',
    icon: 'https://upload.wikimedia.org/wikipedia/en/6/63/Monsters_Inc.JPG',
    decade: '2000s',
  },
  {
    name: 'Finding Nemo',
    icon: 'https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg',
    decade: '2000s',
  },
  {
    name: 'The Incredibles',
    icon: 'https://upload.wikimedia.org/wikipedia/en/2/27/The_Incredibles_%282004_animated_feature_film%29.jpg',
    decade: '2000s',
  },
  {
    name: 'Cars',
    icon: 'https://upload.wikimedia.org/wikipedia/en/3/34/Cars_2006.jpg',
    decade: '2000s',
  },
  {
    name: 'Ratatouille',
    icon: 'https://upload.wikimedia.org/wikipedia/en/5/50/RatatouillePoster.jpg',
    decade: '2000s',
  },
  {
    name: 'WALL-E',
    icon: 'https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-Eposter.jpg',
    decade: '2000s',
  },
  {
    name: 'Up',
    icon: 'https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg',
    decade: '2000s',
  },
  {
    name: 'Cars 2',
    icon: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Cars_2_Poster.jpg',
    decade: '2010s',
  },
  {
    name: 'Toy Story 3',
    icon: 'https://upload.wikimedia.org/wikipedia/en/6/69/Toy_Story_3_poster.jpg',
    decade: '2010s',
  },
  {
    name: 'Brave',
    icon: 'https://upload.wikimedia.org/wikipedia/en/9/96/Brave_Poster.jpg',
    decade: '2010s',
  },
  {
    name: 'Monsters University',
    icon: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Monsters_University_poster_3.jpg',
    decade: '2010s',
  },
  {
    name: 'Inside Out',
    icon: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg',
    decade: '2010s',
  },
  {
    name: 'The Good Dinosaur',
    icon: 'https://upload.wikimedia.org/wikipedia/en/8/80/The_Good_Dinosaur_poster.jpg',
    decade: '2010s',
  },
  {
    name: 'Finding Dory',
    icon: 'https://upload.wikimedia.org/wikipedia/en/3/3e/Finding_Dory.jpg',
    decade: '2010s',
  },
  {
    name: 'Cars 3',
    icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Cars_3_poster.jpg/220px-Cars_3_poster.jpg',
    decade: '2010s',
  },
  {
    name: 'Coco',
    icon: 'https://upload.wikimedia.org/wikipedia/en/9/98/Coco_%282017_film%29_poster.jpg',
    decade: '2010s',
  },
  {
    name: 'Incredibles 2',
    icon: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Incredibles_2_%282018_animated_film%29.jpg',
    decade: '2010s',
  },
  {
    name: 'Toy Story 4',
    icon: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Toy_Story_4_poster.jpg',
    decade: '2010s',
  },
  {
    name: 'Onward',
    icon: 'https://upload.wikimedia.org/wikipedia/en/0/03/Onward_poster.jpg',
    decade: '2020s',
  },
  {
    name: 'Soul',
    icon: 'https://upload.wikimedia.org/wikipedia/en/3/39/Soul_%282020_film%29_poster.jpg',
    decade: '2020s',
  },
  {
    name: 'Luca',
    icon: 'https://upload.wikimedia.org/wikipedia/en/3/33/Luca_%282021_film%29.png',
    decade: '2020s',
  },
];
