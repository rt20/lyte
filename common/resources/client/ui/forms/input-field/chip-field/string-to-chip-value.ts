import {ChipValue} from './chip-field';

export function stringToChipValue(string: string | number): ChipValue {
  // add both name and description so "validateWith" works properly in chip field, if it depends on description
  return {id: string, name: `${string}`, description: `${string}`};
}
