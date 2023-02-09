import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {faker} from '@faker-js/faker';
import {DialogTrigger} from './dialog/dialog-trigger';
import {Dialog} from './dialog/dialog';
import {DialogHeader} from './dialog/dialog-header';
import {DialogBody} from './dialog/dialog-body';
import {Button} from '../buttons/button';

export default {
  title: 'Common/Popover',
  component: DialogTrigger,
} as ComponentMeta<typeof DialogTrigger>;

export const Default = () => {
  return (
    <DialogTrigger type="popover">
      <Button variant="flat" color="primary">
        Click to open popover
      </Button>
      <Dialog>
        <DialogHeader>Dialog title</DialogHeader>
        <DialogBody>body</DialogBody>
      </Dialog>
    </DialogTrigger>
  );
};

export const ScrollPopover = () => {
  return (
    <DialogTrigger type="popover">
      <Button variant="flat" color="primary">
        Click to open popover
      </Button>
      <Dialog>
        <DialogBody>
          <div className="whitespace-pre-wrap">
            {faker.lorem.paragraphs(20)}
          </div>
        </DialogBody>
      </Dialog>
    </DialogTrigger>
  );
};
