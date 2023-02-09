import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {Breadcrumb} from './breadcrumb';
import {BreadcrumbItem} from './breadcrumb-item';
import {Button} from '../buttons/button';

export default {
  title: 'Common/Breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const names = Array.from({length: 10}, () => {
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
});

export const Links: ComponentStory<typeof Breadcrumb> = args => {
  const navigate = () => {
    alert('navigate');
  };
  return (
    <div className="max-w-620 border p-10">
      <Breadcrumb {...args} isNavigation>
        <BreadcrumbItem onSelected={navigate}>Nav Link 1</BreadcrumbItem>
        <BreadcrumbItem onSelected={navigate}>Nav Link 2</BreadcrumbItem>
        <BreadcrumbItem onSelected={navigate}>Nav Link 3</BreadcrumbItem>
        <BreadcrumbItem onSelected={navigate}>Nav Link 4</BreadcrumbItem>
        <BreadcrumbItem onSelected={navigate}>Nav Link 5</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export const Disabled = Links.bind({});
Disabled.args = {
  isDisabled: true,
};

export const Sizes = () => {
  return (
    <>
      <Breadcrumb size="sm">
        {names.slice(0, 5).map((item, index) => {
          return (
            <BreadcrumbItem key={index}>
              <span>{item}</span>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      <Breadcrumb size="md">
        {names.slice(0, 5).map((item, index) => {
          return (
            <BreadcrumbItem key={index}>
              <span>{item}</span>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      <Breadcrumb size="lg">
        {names.slice(0, 5).map((item, index) => {
          return (
            <BreadcrumbItem key={index}>
              <span>{item}</span>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export const Overflow = () => {
  const [items, setItems] = useState(names);
  const navigate = () => {
    alert('navigate');
  };
  return (
    <div className="max-w-780 border p-10">
      <Breadcrumb>
        {items.map((item, index) => {
          return (
            <BreadcrumbItem onSelected={navigate} key={index}>
              <span>{item}</span>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      <Button
        className="mt-40"
        variant="flat"
        color="primary"
        onClick={() => {
          if (items.length === 10) {
            setItems(items.slice(0, 3));
          } else {
            setItems([...names]);
          }
        }}
      >
        Toggle Overflow
      </Button>
    </div>
  );
};
