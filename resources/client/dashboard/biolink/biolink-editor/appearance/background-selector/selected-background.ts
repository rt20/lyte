import {GradientBackground} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/gradient-backgrounds';
import {ColorBackground} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/color-backgrounds';
import {ImageBackground} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/image-backgrounds';

export type SelectedBackground =
  | ImageBackground
  | GradientBackground
  | ColorBackground;
