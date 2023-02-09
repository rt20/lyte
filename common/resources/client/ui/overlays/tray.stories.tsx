import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {DialogTrigger} from './dialog/dialog-trigger';
import {Button} from '../buttons/button';
import {Dialog} from './dialog/dialog';
import {DialogHeader} from './dialog/dialog-header';
import {DialogBody} from './dialog/dialog-body';

export default {
  title: 'Common/Tray',
  component: DialogTrigger,
} as ComponentMeta<typeof DialogTrigger>;

const Template: ComponentStory<typeof DialogTrigger> = args => {
  return (
    <DialogTrigger {...args} type="tray">
      <Button variant="flat" color="primary">
        Open Tray
      </Button>
      <Dialog>
        <DialogHeader>Dialog title</DialogHeader>
        <DialogBody>Tray Body</DialogBody>
      </Dialog>
    </DialogTrigger>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const ScrollingBody = () => {
  return (
    <DialogTrigger type="tray">
      <Button variant="flat" color="primary">
        Open Tray
      </Button>
      <Dialog>
        <DialogHeader>Dialog title</DialogHeader>
        <DialogBody>{faker.lorem.lines(50)}</DialogBody>
      </Dialog>
    </DialogTrigger>
  );
};
