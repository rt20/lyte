import React, {useContext, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {DialogTrigger} from './dialog/dialog-trigger';
import {Button} from '../buttons/button';
import {DialogFooter} from './dialog/dialog-footer';
import {Menu, MenuItem, MenuTrigger} from '../navigation/menu/menu-trigger';
import {Tooltip} from '../tooltip/tooltip';
import {TextField} from '../forms/input-field/text-field/text-field';
import {DialogContext} from './dialog/dialog-context';
import {Dialog, DialogSize} from './dialog/dialog';
import {DialogHeader} from './dialog/dialog-header';
import {DialogBody} from './dialog/dialog-body';

export default {
  title: 'Common/Modal',
  component: DialogTrigger,
} as ComponentMeta<typeof DialogTrigger>;

const BodyText = faker.lorem.lines(120);

const Template: ComponentStory<typeof DialogTrigger> = args => {
  return (
    <div className="overflow-auto h-full">
      <DialogTrigger {...args} type="modal">
        <Button variant="flat" color="primary">
          Open Modal
        </Button>
        <StoryDialog args={args} />
      </DialogTrigger>
      <div className="mt-20">{BodyText}</div>
    </div>
  );
};

export const NoTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="overflow-auto h-full">
      <Button
        variant="flat"
        color="primary"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Outside Trigger
      </Button>
      <DialogTrigger
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        type="modal"
      >
        <StoryDialog />
      </DialogTrigger>
    </div>
  );
};

export const BlockScrolling = Template.bind({});
BlockScrolling.args = {};

export const StartOpened = Template.bind({});
StartOpened.args = {
  defaultIsOpen: true,
  disableInitialTransition: true,
};

function StoryDialog({args}: any) {
  const {close} = useContext(DialogContext);
  return (
    <Dialog {...args}>
      <DialogHeader>Dialog title</DialogHeader>
      <DialogBody>
        <TextField label="Auto Focus" autoFocus />
        <div className="py-20">
          <MenuTrigger>
            <Button variant="outline">Open Nested Menu</Button>
            <Menu>
              <MenuItem value="one">One</MenuItem>
              <MenuItem value="two">Two</MenuItem>
            </Menu>
          </MenuTrigger>
          <Tooltip label="tooltip">
            <Button variant="flat" color="primary">
              tooltip
            </Button>
          </Tooltip>
          <div> {faker.lorem.lines(10)}</div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={close}>
          Close
        </Button>
        <Button
          variant="flat"
          color="primary"
          onClick={() => {
            close('value');
          }}
        >
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export const ScrollingBody = ({size}: {size?: DialogSize}) => {
  return (
    <div className="overflow-auto h-full">
      <DialogTrigger type="modal">
        <Button variant="flat" color="primary">
          Open Modal
        </Button>
        <Dialog size={size}>
          <DialogHeader>Header</DialogHeader>
          <DialogBody>{faker.lorem.lines(150)}</DialogBody>
          <DialogFooter>Footer</DialogFooter>
        </Dialog>
      </DialogTrigger>
    </div>
  );
};

export const Fullscreen = () => {
  return <ScrollingBody size="fullscreen" />;
};

export const FullscreenTakeover = () => {
  return <ScrollingBody size="fullscreenTakeover" />;
};
