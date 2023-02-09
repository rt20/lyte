import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Menu, MenuItem, MenuSection, MenuTrigger} from './menu-trigger';
import {Button} from '../../buttons/button';
import {ContentCopyIcon} from '../../../icons/material/ContentCopy';
import {ContentCutIcon} from '../../../icons/material/ContentCut';
import {Keyboard} from '../../keyboard/keyboard';
import {Trans} from '../../../i18n/trans';
import {faker} from '@faker-js/faker';

export default {
  title: 'Common/MenuTrigger',
  component: MenuTrigger,
  argTypes: {onItemSelected: {action: 'onAction'}},
} as ComponentMeta<typeof MenuTrigger>;

const Template: ComponentStory<typeof MenuTrigger> = args => {
  return (
    <MenuTrigger {...args}>
      <Button variant="flat" size="sm" color="primary">
        Open
      </Button>
      <Menu>
        <MenuItem
          value="copy"
          startIcon={<ContentCopyIcon />}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        >
          <Trans message="Start Icon Translated" />
        </MenuItem>
        <MenuItem
          value="cut"
          endIcon={<ContentCutIcon />}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        >
          End Icon
        </MenuItem>
        <MenuItem
          value="paste"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        >
          Description
        </MenuItem>
        <MenuItem value="delete" endSection={<Keyboard>shift+del</Keyboard>}>
          Keyboard shortcut
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

export const Sections: ComponentStory<typeof MenuTrigger> = () => {
  const [value, setValue] = useState<string | number>();
  return (
    <MenuTrigger
      selectionMode="single"
      selectedValue={value}
      onSelectionChange={setValue}
    >
      <Button variant="flat" size="sm" color="primary">
        Open
      </Button>
      <Menu>
        <MenuItem value="One">One</MenuItem>
        <MenuItem value="Two">Two</MenuItem>
        <MenuSection label="Section with label">
          <MenuItem value="Three">Three</MenuItem>
          <MenuItem value="Four">Four</MenuItem>
        </MenuSection>
        <MenuSection>
          <MenuItem value="Five">Five (No section label)</MenuItem>
          <MenuItem value="Six">Six (No section label)</MenuItem>
        </MenuSection>
        <MenuSection>
          <MenuItem value="Seven">Single item in section</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const SelectedItem = () => {
  const [value, setValue] = useState<string | number>('Two');
  return (
    <MenuTrigger
      selectedValue={value}
      onSelectionChange={setValue}
      selectionMode="single"
    >
      <Button variant="flat" size="sm" color="primary">
        Open
      </Button>
      <Menu>
        <MenuItem value="One">One</MenuItem>
        <MenuItem value="Two">Two</MenuItem>
        <MenuItem value="Three">Three</MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  selectionMode: 'multiple',
  selectedValue: ['copy', 'cut'],
};

export const SelectionDisabled = Template.bind({});
SelectionDisabled.args = {};

export const DisabledItems = () => {
  return (
    <MenuTrigger selectionMode="single">
      <Button variant="flat" size="sm" color="primary">
        Open
      </Button>
      <Menu>
        <MenuItem value="One" isDisabled>
          One
        </MenuItem>
        <MenuItem value="Two">Two</MenuItem>
        <MenuItem value="Three">Three</MenuItem>
        <MenuItem value="Four">Four</MenuItem>
        <MenuItem value="Five" isDisabled>
          Five
        </MenuItem>
        <MenuItem value="Six">Six</MenuItem>
        <MenuItem value="Seven">Seven</MenuItem>
        <MenuItem value="Eight" isDisabled>
          Eight
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

export const AllItemsDisabled = () => {
  return (
    <MenuTrigger selectionMode="single">
      <Button variant="flat" size="sm" color="primary">
        Open
      </Button>
      <Menu>
        <MenuItem value="One" isDisabled>
          One
        </MenuItem>
        <MenuItem value="Two" isDisabled>
          Two
        </MenuItem>
        <MenuItem value="Three" isDisabled>
          Three
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

export const ScrollingBody = () => {
  return (
    <div className="overflow-scroll max-h-full">
      <MenuTrigger selectionMode="single">
        <Button variant="flat" size="sm" color="primary">
          Open
        </Button>
        <Menu>
          <MenuItem value="One">One</MenuItem>
          <MenuItem value="Two">Two</MenuItem>
          <MenuItem value="Three">Three</MenuItem>
        </Menu>
      </MenuTrigger>
      {faker.lorem.lines(250)}
    </div>
  );
};
