import {message} from '@common/i18n/message';
import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';
import {MessageDescriptor} from '@common/i18n/message-descriptor';

export const LinkOverlayThemes = [
  {key: 'default', label: message('Default')},
  {key: 'full-width', label: message('Full width')},
  {key: 'rounded', label: message('Rounded')},
  {key: 'pill', label: message('Pill')},
];

export const LinkOverlayPositions = [
  {key: 'top-left', label: message('Top left')},
  {key: 'top-right', label: message('Top right')},
  {key: 'bottom-left', label: message('Bottom left')},
  {key: 'bottom-right', label: message('Bottom right')},
];

export const LinkOverlayColors: {
  key: keyof LinkOverlay['colors'];
  label: MessageDescriptor;
}[] = [
  {key: 'bg-color', label: message('Background color')},
  {key: 'text-color', label: message('Text color')},
  {key: 'btn-bg-color', label: message('Button background')},
  {key: 'btn-text-color', label: message('Button text')},
  {key: 'label-bg-color', label: message('Label background')},
  {key: 'label-color', label: message('Label text')},
];
