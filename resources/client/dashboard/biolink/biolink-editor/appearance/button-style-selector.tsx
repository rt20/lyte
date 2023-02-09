import {Trans} from '@common/i18n/trans';
import {BiolinkBtnConfig} from '@app/dashboard/biolink/biolink';
import {Button} from '@common/ui/buttons/button';
import clsx from 'clsx';
import {message} from '@common/i18n/message';
import {ButtonVariant} from '@common/ui/buttons/get-shared-button-style';
import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {
  biolinkEditorState,
  useBiolinkEditorStore,
} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {ButtonBase} from '@common/ui/buttons/button-base';
import React, {useCallback} from 'react';
import {appearanceHeaderClassnames} from '@app/dashboard/biolink/biolink-editor/appearance/header-classnames';

const AvailableVariants: Record<
  NonNullable<Exclude<ButtonVariant, 'text' | 'raised' | 'link'>>,
  MessageDescriptor
> = {
  flat: message('Fill'),
  outline: message('Outline'),
} as const;

const AvailableRadius: Record<
  NonNullable<BiolinkBtnConfig['radius']>,
  MessageDescriptor
> = {
  'rounded-none': message('Square'),
  rounded: message('Rounded'),
  'rounded-full': message('Pill'),
} as const;

interface ButtonStyleSelectorProps {
  className?: string;
}
export function ButtonStyleSelector({className}: ButtonStyleSelectorProps) {
  const value = useBiolinkEditorStore(s => s.appearance?.btnConfig);

  const setValue = useCallback(
    (newValue: Partial<BiolinkBtnConfig>) => {
      biolinkEditorState().updateAppearance({
        btnConfig: {
          ...value,
          ...newValue,
        },
      });
    },
    [value]
  );

  return (
    <div className={className}>
      <h2 className={appearanceHeaderClassnames.h2}>
        <Trans message="Buttons" />
      </h2>
      <StyleSelector value={value} onChange={setValue} />
      <ShadowSelector value={value} onChange={setValue} />
    </div>
  );
}

interface StyleSelectorProps {
  value?: BiolinkBtnConfig;
  onChange: (newValue: BiolinkBtnConfig) => void;
}
function StyleSelector({value, onChange}: StyleSelectorProps) {
  const selectedVariant = value?.variant ?? 'flat';
  const selectedRadius = value?.radius ?? 'rounded';

  return (
    <div>
      {Object.entries(AvailableVariants).map(([variant, variantLabel]) => (
        <div key={variant}>
          <h3 className={appearanceHeaderClassnames.h3}>
            <Trans {...variantLabel} />
          </h3>
          <div className="grid gap-24 grid-cols-2 md:grid-cols-3">
            {Object.entries(AvailableRadius).map(([radius, radiusLabel]) => (
              <div
                key={radius}
                className={clsx(
                  'rounded',
                  variant === selectedVariant &&
                    selectedRadius === radius &&
                    'ring ring-primary-light ring-offset-4'
                )}
              >
                <Button
                  variant={variant as ButtonVariant}
                  color="primary"
                  radius={radius}
                  className="w-full"
                  onClick={() => {
                    onChange({
                      variant: variant as ButtonVariant,
                      radius: radius as BiolinkBtnConfig['radius'],
                    });
                  }}
                >
                  <Trans {...radiusLabel} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const AvailableShadows: Record<string, MessageDescriptor> = {
  'shadow-none': message('No shadow'),
  'rgb(0 0 0 / 20%) 0.2rem 0.2rem 0.4rem 0px': message('Light shadow'),
  'rgb(0 0 0 / 75%) 0.3rem 0.4rem 0px': message('Hard shadow'),
} as const;
function ShadowSelector({value, onChange}: StyleSelectorProps) {
  const selectedShadow = value?.shadow ?? 'shadow-none';
  return (
    <div>
      <h3 className="my-12 font-semibold">
        <Trans message="Shadow" />
      </h3>
      <div className="flex gap-24">
        {Object.entries(AvailableShadows).map(([shadow, shadowLabel]) => (
          <div key={shadow} style={{boxShadow: shadow}}>
            <ButtonBase
              className={clsx(
                'w-70 h-40 border rounded',
                selectedShadow === shadow && 'border-primary'
              )}
              onClick={() => {
                onChange({
                  shadow: shadow === 'shadow-none' ? undefined : shadow,
                });
              }}
            >
              <span className="sr-only">
                <Trans {...shadowLabel} />
              </span>
            </ButtonBase>
          </div>
        ))}
      </div>
    </div>
  );
}
