import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {BackgroundSelector} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/background-selector';
import React, {Fragment} from 'react';
import {
  biolinkEditorState,
  useBiolinkEditorStore,
} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {ButtonStyleSelector} from '@app/dashboard/biolink/biolink-editor/appearance/button-style-selector';
import {FontSelector as CommonFontSelector} from '@common/ui/font-selector/font-selector';
import {useSaveBiolinkAppearance} from '@app/dashboard/biolink/biolink-editor/requests/use-save-biolink-appearance';
import {BrowserSafeFonts} from '@common/ui/font-picker/browser-safe-fonts';
import {ColorInput} from '@app/dashboard/biolink/biolink-editor/appearance/color-input';
import {appearanceHeaderClassnames} from '@app/dashboard/biolink/biolink-editor/appearance/header-classnames';

export function BiolinkAppearanceEditor() {
  const saveAppearance = useSaveBiolinkAppearance();
  const isDirty = useBiolinkEditorStore(s => s.appearanceIsDirty);

  return (
    <Fragment>
      <header className="mb-40">
        <h1 className="text-2xl mb-4">
          <Trans message="Custom appearance" />
        </h1>
        <div className="text-sm mb-20">
          <Trans message="Fully customize your Biolink. Change background color or select gradients and images. Choose button style, text color, typeface and more." />
        </div>
        <Button
          variant="flat"
          color="primary"
          type="submit"
          onClick={() => saveAppearance.mutate()}
          disabled={!isDirty || saveAppearance.isLoading}
        >
          <Trans message="Save changes" />
        </Button>
      </header>
      <BackgroundSelector />
      <ColorSelector />
      <ButtonStyleSelector className="my-60" />
      <FontSelector />
    </Fragment>
  );
}

function ColorSelector() {
  const btnConfig = useBiolinkEditorStore(s => s.appearance?.btnConfig);
  const bgConfig = useBiolinkEditorStore(s => s.appearance?.bgConfig);

  return (
    <div className="my-60">
      <h2 className={appearanceHeaderClassnames.h2}>
        <Trans message="Colors" />
      </h2>
      <div className="md:grid grid-cols-3 items-center gap-24">
        <ColorInput
          label={<Trans message="Text color" />}
          value={bgConfig?.color || '#000'}
          onChange={newValue => {
            biolinkEditorState().updateAppearance({
              bgConfig: {
                ...bgConfig,
                color: newValue,
              },
            });
          }}
        />
        <ColorInput
          label={<Trans message="Button color" />}
          value={btnConfig?.color || '#000'}
          onChange={newValue => {
            biolinkEditorState().updateAppearance({
              btnConfig: {
                ...btnConfig,
                color: newValue,
              },
            });
          }}
        />
        <ColorInput
          label={<Trans message="Button text color" />}
          value={btnConfig?.textColor || '#000'}
          onChange={newValue => {
            biolinkEditorState().updateAppearance({
              btnConfig: {
                ...btnConfig,
                textColor: newValue,
              },
            });
          }}
        />
      </div>
    </div>
  );
}

function FontSelector() {
  const currentValue =
    useBiolinkEditorStore(s => s.appearance?.fontConfig) || BrowserSafeFonts[0];
  return (
    <div>
      <h2 className={appearanceHeaderClassnames.h2}>
        <Trans message="Font" />
      </h2>
      <CommonFontSelector
        value={currentValue}
        onChange={newValue => {
          biolinkEditorState().updateAppearance({
            fontConfig: {
              ...currentValue,
              ...newValue,
            },
          });
        }}
      />
    </div>
  );
}
