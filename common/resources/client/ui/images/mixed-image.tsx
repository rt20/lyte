import {ComponentType, HTMLAttributes, useEffect, useState} from 'react';
import {SvgImage} from './svg-image/svg-image';
import {SvgIconProps} from '../../icons/svg-icon';
import {isAbsoluteUrl} from '@common/utils/urls/is-absolute-url';

interface Props extends HTMLAttributes<HTMLElement> {
  src: string | ComponentType<SvgIconProps>;
  className?: string;
}
export function MixedImage({src, className, ...domProps}: Props) {
  const [type, setType] = useState<'svg' | 'image' | 'icon' | null>(null);

  useEffect(() => {
    if (!src) return;
    if (typeof src === 'object') {
      setType('icon');
    } else if (
      (src as string).endsWith('.svg') &&
      !isAbsoluteUrl(src as string)
    ) {
      setType('svg');
    } else {
      setType('image');
    }
  }, [src]);

  if (type === 'svg') {
    return <SvgImage {...domProps} className={className} src={src as string} />;
  }

  if (type === 'image') {
    return (
      <img {...domProps} className={className} src={src as string} alt="" />
    );
  }

  if (type === 'icon') {
    const Icon = src;
    return (
      <Icon
        {...(domProps as HTMLAttributes<SVGElement>)}
        className={className}
      />
    );
  }

  return null;
}
