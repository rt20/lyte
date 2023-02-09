import {SelectedBackground} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/selected-background';
import {CSSProperties} from 'react';
import {ImageBackground} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/image-backgrounds';

export function cssPropsFromBgConfig(
  bgConfig?: Partial<SelectedBackground>
): CSSProperties | undefined {
  if (bgConfig) {
    const config = bgConfig as ImageBackground;
    return {
      backgroundImage: config.backgroundImage,
      backgroundColor: config.backgroundColor,
      backgroundAttachment: config.backgroundAttachment,
      backgroundSize: config.backgroundSize,
      backgroundRepeat: config.backgroundRepeat,
      backgroundPosition: config.backgroundPosition,
      color: config.color,
    };
  }
}
