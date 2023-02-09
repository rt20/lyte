import {ColorPresets} from '@common/ui/color-picker/color-presets';
import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {message} from '@common/i18n/message';

export interface ColorBackground {
  type: 'color';
  id: string;
  backgroundColor?: string;
  color?: string;
  label: MessageDescriptor;
}
export const BaseColorBg: ColorBackground = {
  type: 'color',
  id: 'c-custom',
  label: message('Custom color'),
};

export const ColorBackgrounds: ColorBackground[] = ColorPresets.map(
  (preset, index) => {
    return {
      ...BaseColorBg,
      id: `c${index}`,
      backgroundColor: preset.color,
      label: preset.name,
      color: preset.foreground,
    };
  }
);
