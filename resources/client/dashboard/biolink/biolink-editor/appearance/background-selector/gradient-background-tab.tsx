import {Trans} from '@common/i18n/trans';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {BackgroundSelectorButton} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/background-selector-button';
import {
  BaseGradientBg,
  GradientBackground,
  GradientBackgrounds,
} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/gradient-backgrounds';
import {GradientIcon} from '@common/icons/material/Gradient';
import {BgSelectorTabProps} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/background-selector';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useCallback, useState} from 'react';
import clsx from 'clsx';
import {ColorPickerDialog} from '@common/ui/color-picker/color-picker-dialog';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ArrowDownwardIcon} from '@common/icons/material/ArrowDownward';
import {ArrowForwardIcon} from '@common/icons/material/ArrowForward';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {ArrowUpwardIcon} from '@common/icons/material/ArrowUpward';

export function GradientBackgroundTab({
  value,
  onChange,
  className,
}: BgSelectorTabProps<GradientBackground>) {
  return (
    <div className={className}>
      <CustomGradientButton value={value} onChange={onChange} />
      {GradientBackgrounds.map(gradient => (
        <BackgroundSelectorButton
          key={gradient.backgroundImage}
          label={gradient.label && <Trans {...gradient.label} />}
          isActive={value?.id === gradient.id}
          style={{backgroundImage: gradient.backgroundImage}}
          onClick={() => {
            onChange?.({
              ...BaseGradientBg,
              ...gradient,
            });
          }}
        />
      ))}
    </div>
  );
}

function CustomGradientButton({
  value,
  onChange,
}: BgSelectorTabProps<GradientBackground>) {
  const isCustomGradient = value?.id === BaseGradientBg.id;
  return (
    <DialogTrigger
      type="popover"
      currentValue={value}
      onOpenChange={isOpen => {
        // on dialog open set default gradient as active, if no other gradient is selected
        if (isOpen && !value) {
          onChange?.(GradientBackgrounds[0]);
        }
      }}
      onClose={gradient => {
        // apply gradient or revert to original
        onChange?.(gradient);
      }}
    >
      <BackgroundSelectorButton
        label={<Trans {...BaseGradientBg.label} />}
        className="border-dashed border-2"
        style={{
          backgroundImage: isCustomGradient
            ? value?.backgroundImage
            : undefined,
        }}
      >
        <span className="inline-block text-white bg-black/20 rounded p-10">
          <GradientIcon size="lg" />
        </span>
      </BackgroundSelectorButton>
      <CustomGradientDialog
        defaultValue={value}
        onChange={newValue => {
          onChange?.(newValue);
        }}
      />
    </DialogTrigger>
  );
}

interface CustomGradientState {
  colorOne: string;
  colorTwo: string;
  angle: string;
}
interface CustomGradientDialogProps {
  defaultValue?: GradientBackground;
  onChange: (value: GradientBackground) => void;
}
function CustomGradientDialog({
  defaultValue = GradientBackgrounds[0],
  onChange,
}: CustomGradientDialogProps) {
  const {close} = useDialogContext();
  const [state, setLocalState] = useState<CustomGradientState>(() => {
    const parts =
      defaultValue?.backgroundImage?.match(/\(([0-9]+deg),.?(.+?),.?(.+?)\)/) ||
      [];
    return {
      angle: parts[1] || '45deg',
      colorOne: parts[2] || '#ff9a9e',
      colorTwo: parts[3] || '#fad0c4',
    };
  });

  const buildGradientBackground = (s: CustomGradientState) => {
    return {
      ...BaseGradientBg,
      backgroundImage: `linear-gradient(${s.angle}, ${s.colorOne}, ${s.colorTwo})`,
    };
  };

  const setState = useCallback(
    (newValues: Partial<CustomGradientState>) => {
      const newState = {
        ...state,
        ...newValues,
      };
      setLocalState(newState);
      onChange(buildGradientBackground(newState));
    },
    [state, onChange]
  );

  return (
    <Dialog size="sm">
      <DialogHeader>
        <Trans message="Custom gradient" />
      </DialogHeader>
      <DialogBody>
        <div className="mb-6">
          <Trans message="Colors" />
        </div>
        <div className="flex items-stretch h-40 mb-20">
          <ColorPickerButton
            className="rounded-l"
            value={state.colorOne}
            onChange={value => setState({colorOne: value})}
          />
          <div
            className="flex-auto border-y border-[#c3cbdc]"
            style={{
              backgroundImage: buildGradientBackground(state).backgroundImage,
            }}
          />
          <ColorPickerButton
            className="rounded-r"
            value={state.colorTwo}
            onChange={value => setState({colorTwo: value})}
          />
        </div>
        <div className="mb-6">
          <Trans message="Direction" />
        </div>
        <DirectionButtons
          value={state.angle}
          onChange={value => setState({angle: value})}
        />
      </DialogBody>
      <DialogFooter dividerTop>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          variant="flat"
          color="primary"
          onClick={() => {
            close(buildGradientBackground(state));
          }}
        >
          <Trans message="Apply" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

interface ColorPickerButtonProps {
  className: string;
  value: string;
  onChange: (value: string) => void;
}
function ColorPickerButton({
  className,
  value,
  onChange,
}: ColorPickerButtonProps) {
  return (
    <DialogTrigger type="popover">
      <Tooltip label={<Trans message="Click to change color" />}>
        <button
          type="button"
          className={clsx(
            'w-40 flex-shrink-0 border border-[#c3cbdc]',
            className
          )}
          style={{backgroundColor: value}}
        />
      </Tooltip>
      <ColorPickerDialog defaultValue={value} onChange={onChange} hideFooter />
    </DialogTrigger>
  );
}

interface DirectionButtonsProps {
  value: string;
  onChange: (value: string) => void;
}
function DirectionButtons({value, onChange}: DirectionButtonsProps) {
  const activeStyle = 'text-primary border-primary';
  return (
    <div className="text-muted flex items-center flex-wrap gap-10">
      <IconButton
        radius="rounded-full"
        variant="outline"
        className={value === '0deg' ? activeStyle : undefined}
        onClick={() => onChange('0deg')}
      >
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton
        radius="rounded-full"
        variant="outline"
        className={value === '180deg' ? activeStyle : undefined}
        onClick={() => onChange('180deg')}
      >
        <ArrowDownwardIcon />
      </IconButton>
      <IconButton
        radius="rounded-full"
        variant="outline"
        className={value === '90deg' ? activeStyle : undefined}
        onClick={() => onChange('90deg')}
      >
        <ArrowForwardIcon />
      </IconButton>
      <IconButton
        radius="rounded-full"
        variant="outline"
        className={value === '135deg' ? activeStyle : undefined}
        onClick={() => onChange('135deg')}
      >
        <ArrowDownwardIcon className="-rotate-45" />
      </IconButton>
      <IconButton
        radius="rounded-full"
        variant="outline"
        className={value === '225deg' ? activeStyle : undefined}
        onClick={() => onChange('225deg')}
      >
        <ArrowDownwardIcon className="rotate-45" />
      </IconButton>
      <IconButton
        radius="rounded-full"
        variant="outline"
        className={value === '45deg' ? activeStyle : undefined}
        onClick={() => onChange('45deg')}
      >
        <ArrowUpwardIcon className="rotate-45" />
      </IconButton>
      <IconButton
        radius="rounded-full"
        variant="outline"
        className={value === '325deg' ? activeStyle : undefined}
        onClick={() => onChange('325deg')}
      >
        <ArrowUpwardIcon className="-rotate-45" />
      </IconButton>
    </div>
  );
}
