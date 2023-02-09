import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ButtonGroup, ButtonGroupProps} from './button-group';
import {IconButton} from './icon-button';
import {ContentCutIcon} from '../../icons/material/ContentCut';
import {ContentCopyIcon} from '../../icons/material/ContentCopy';
import {ContentPasteIcon} from '../../icons/material/ContentPaste';
import {useState} from 'react';
import {Button} from './button';

export default {
  title: 'Common/ButtonGroup',
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

const SingleGroup = (args: Omit<ButtonGroupProps, 'children'>) => {
  return (
    <ButtonGroup {...args}>
      <IconButton value="cut">
        <ContentCutIcon />
      </IconButton>
      <IconButton value="copy">
        <ContentCopyIcon />
      </IconButton>
      <IconButton value="paste">
        <ContentPasteIcon />
      </IconButton>
    </ButtonGroup>
  );
};

const Template: ComponentStory<typeof ButtonGroup> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SingleGroup {...args} />
    </div>
  );
};

const TextTemplate: ComponentStory<typeof ButtonGroup> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ButtonGroup {...args}>
        <Button value="cut">Cut</Button>
        <Button value="copy">Copy</Button>
        <Button value="paste">Paste</Button>
      </ButtonGroup>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
};

export const Rounded = Template.bind({});
Rounded.args = {
  variant: 'outline',
  radius: 'rounded',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'outline',
  radius: 'rounded',
  disabled: true,
};

export const Controlled = () => {
  const [value, setValue] = useState('copy');
  return (
    <div className="w-full h-full flex flex-col gap-40 items-center justify-center text-muted">
      <SingleGroup
        size="sm"
        variant="outline"
        radius="rounded"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export const ControlledMultiple = () => {
  const [value, setValue] = useState(['cut', 'copy']);
  return (
    <div className="w-full h-full flex flex-col gap-40 items-center justify-center text-muted">
      <SingleGroup
        size="sm"
        variant="outline"
        radius="rounded"
        value={value}
        multiple
        onChange={setValue}
      />
    </div>
  );
};

export const Sizes = () => {
  return (
    <div className="w-full h-full flex flex-col gap-40 items-center justify-center text-muted">
      <SingleGroup size="xs" variant="outline" radius="rounded" />
      <SingleGroup size="sm" variant="outline" radius="rounded" />
      <SingleGroup size="md" variant="outline" radius="rounded" />
      <SingleGroup size="lg" variant="outline" radius="rounded" />
      <SingleGroup size="xl" variant="outline" radius="rounded" />
    </div>
  );
};

export const Text = TextTemplate.bind({});
Text.args = {};

export const TextOutline = TextTemplate.bind({});
TextOutline.args = {
  variant: 'outline',
};

export const TextFlat = TextTemplate.bind({});
TextFlat.args = {
  variant: 'flat',
  color: 'primary',
  radius: 'rounded',
};
