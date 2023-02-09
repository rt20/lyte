import {Trans} from '@common/i18n/trans';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ColorPickerDialog} from '@common/ui/color-picker/color-picker-dialog';
import {BackgroundSelectorButton} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/background-selector-button';
import {FormatColorFillIcon} from '@common/icons/material/FormatColorFill';
import {BgSelectorTabProps} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/background-selector';
import {
  BaseColorBg,
  ColorBackground,
  ColorBackgrounds,
} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/color-backgrounds';

export function ColorBackgroundTab({
  value,
  onChange,
  className,
}: BgSelectorTabProps<ColorBackground>) {
  return (
    <div className={className}>
      <CustomColorButton value={value} onChange={onChange} />
      {ColorBackgrounds.map(background => (
        <BackgroundSelectorButton
          key={background.id}
          label={<Trans {...background.label} />}
          isActive={value?.id === background.id}
          style={{backgroundColor: background.backgroundColor}}
          onClick={() => {
            onChange?.({
              ...BaseColorBg,
              ...background,
            });
          }}
        />
      ))}
    </div>
  );
}

function CustomColorButton({
  value,
  onChange,
}: BgSelectorTabProps<ColorBackground>) {
  const isCustomColor = value?.id === BaseColorBg.id;
  return (
    <DialogTrigger
      currentValue={value}
      type="popover"
      onClose={(newValue: ColorBackground | string) => {
        // apply color or revert to original
        onChange?.(
          typeof newValue === 'string'
            ? {...BaseColorBg, backgroundColor: newValue}
            : newValue
        );
      }}
    >
      <BackgroundSelectorButton
        label={<Trans {...BaseColorBg.label} />}
        className="border-dashed border-2"
        style={{
          backgroundColor: isCustomColor ? value?.backgroundColor : undefined,
        }}
      >
        <span className="inline-block text-white bg-black/20 rounded p-10">
          <FormatColorFillIcon size="lg" />
        </span>
      </BackgroundSelectorButton>
      <ColorPickerDialog
        defaultValue={value?.backgroundColor}
        onChange={newColor => {
          // set color on color picker interaction
          onChange?.({
            ...BaseColorBg,
            backgroundColor: newColor,
          });
        }}
      />
    </DialogTrigger>
  );
}
