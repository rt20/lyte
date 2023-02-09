import {getInputFieldClassNames} from '@common/ui/forms/input-field/get-input-field-class-names';
import React, {Fragment, ReactNode, useId} from 'react';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ButtonBase} from '@common/ui/buttons/button-base';
import {ColorPickerDialog} from '@common/ui/color-picker/color-picker-dialog';
import {HexColorInput} from 'react-colorful';

interface ColorInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: ReactNode;
}
export function ColorInput({value, onChange, label}: ColorInputProps) {
  const style = getInputFieldClassNames({
    size: 'md',
    startAppend: <Fragment />,
  });
  const id = useId();

  return (
    <div>
      <label className={style.label} htmlFor={id}>
        {label}
      </label>
      <div className="flex">
        <DialogTrigger type="popover">
          <ButtonBase
            className="w-42 h-42 bg-black rounded-l flex-shrink-0 border"
            style={{backgroundColor: value}}
          />
          <ColorPickerDialog
            showInput={false}
            defaultValue={value}
            onChange={onChange}
          />
        </DialogTrigger>
        <HexColorInput
          id={id}
          autoComplete="off"
          role="textbox"
          autoCorrect="off"
          spellCheck="false"
          required
          prefixed
          className={style.input}
          color={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
