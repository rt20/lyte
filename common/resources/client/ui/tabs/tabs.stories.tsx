import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {Tabs} from './tabs';
import {TabList} from './tab-list';
import {Tab} from './tab';
import {TabPanel, TabPanels} from './tab-panels';

export default {
  title: 'Common/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args, identifier) => {
  const disableItem = identifier.name === 'Disabled';
  return (
    <Tabs {...args}>
      <TabList>
        <Tab>One</Tab>
        <Tab isDisabled={disableItem}>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{faker.lorem.paragraphs(5)}</TabPanel>
        <TabPanel>{faker.lorem.paragraphs(5)}</TabPanel>
        <TabPanel>{faker.lorem.paragraphs(5)}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};

export const Lazy = Template.bind({});
Lazy.args = {
  isLazy: true,
};

export const Disabled = Template.bind({});

export const Controlled = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{faker.lorem.paragraphs(5)}</TabPanel>
        <TabPanel>{faker.lorem.paragraphs(5)}</TabPanel>
        <TabPanel>{faker.lorem.paragraphs(5)}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
