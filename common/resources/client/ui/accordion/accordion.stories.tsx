import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {Accordion, AccordionItem} from './accordion';

export default {
  title: 'Common/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = args => {
  return (
    <Accordion {...args}>
      <AccordionItem label={faker.company.bs()}>
        {faker.lorem.paragraph(20)}
      </AccordionItem>
      <AccordionItem label={faker.company.bs()}>
        {faker.lorem.paragraph(20)}
      </AccordionItem>
      <AccordionItem label={faker.company.bs()}>
        {faker.lorem.paragraph(20)}
      </AccordionItem>
      <AccordionItem label={faker.company.bs()}>
        {faker.lorem.paragraph(20)}
      </AccordionItem>
    </Accordion>
  );
};

export const SingleMode = Template.bind({});
SingleMode.args = {
  mode: 'single',
};

export const MultipleMode = Template.bind({});
MultipleMode.args = {
  mode: 'multiple',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  mode: 'single',
};

export const DisabledItems: ComponentStory<typeof Accordion> = () => {
  return (
    <Accordion>
      <AccordionItem label={faker.company.bs()}>
        {faker.lorem.paragraph(20)}
      </AccordionItem>
      <AccordionItem label={faker.company.bs()} disabled>
        {faker.lorem.paragraph(20)}
      </AccordionItem>
      <AccordionItem label={faker.company.bs()}>
        {faker.lorem.paragraph(20)}
      </AccordionItem>
      <AccordionItem label={faker.company.bs()} disabled>
        {faker.lorem.paragraph(20)}
      </AccordionItem>
    </Accordion>
  );
};
