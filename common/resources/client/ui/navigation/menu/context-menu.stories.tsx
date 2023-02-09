import React, {useEffect, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {MenuItem} from './menu-trigger';
import {ContentCopyIcon} from '../../../icons/material/ContentCopy';
import {ContentCutIcon} from '../../../icons/material/ContentCut';
import {Keyboard} from '../../keyboard/keyboard';
import {ContextMenu} from './context-menu';
import {Trans} from '../../../i18n/trans';

export default {
  title: 'Common/ContextMenu',
  component: ContextMenu,
  argTypes: {onItemSelected: {action: 'onItemSelected'}},
} as ComponentMeta<typeof ContextMenu>;

const Template: ComponentStory<typeof ContextMenu> = args => {
  const [position, setPosition] = useState<{x: number; y: number} | null>(null);

  useEffect(() => {
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
      setPosition({x: e.clientX, y: e.clientY});
    });
  }, []);

  return (
    <>
      <div className="p-20">Right click to open</div>
      <ContextMenu
        position={position}
        isOpen={position != null}
        onOpenChange={isOpen => {
          if (!isOpen) {
            setPosition(null);
          }
        }}
        {...args}
      >
        <MenuItem
          value="copy"
          startIcon={<ContentCopyIcon />}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        >
          <Trans message="Start Icon Translated" />
        </MenuItem>
        <MenuItem
          isDisabled
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
      </ContextMenu>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const SelectedItem = Template.bind({});
SelectedItem.args = {
  selectionMode: 'single',
  selectedValue: 'cut',
};

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  selectionMode: 'multiple',
  selectedValue: ['copy', 'cut'],
};

export const SelectionDisabled = Template.bind({});
SelectionDisabled.args = {};
