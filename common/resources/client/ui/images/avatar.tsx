import clsx from 'clsx';
import {ComponentPropsWithoutRef, forwardRef} from 'react';

type Size = 'xs' | 'sm' | 'md';

interface Props extends ComponentPropsWithoutRef<'img'> {
  className?: string;
  src?: string;
  circle?: boolean;
  size?: Size;
}

export const Avatar = forwardRef<HTMLImageElement, Props>(
  ({className, circle, size = 'md', src, ...domProps}, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt=""
        className={clsx(
          'object-cover',
          className,
          getSizeClassName(size),
          circle ? 'rounded-full' : 'rounded'
        )}
        {...domProps}
      />
    );
  }
);

function getSizeClassName(size: Size) {
  switch (size) {
    case 'xs':
      return 'w-18 h-18';
    case 'sm':
      return 'w-24 h-24';
    case 'md':
      return 'w-32 h-32';
    // allow overriding with custom classNames
    default:
      return size;
  }
}
