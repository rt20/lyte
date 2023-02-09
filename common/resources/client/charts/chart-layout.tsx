import {ReactNode, Ref} from 'react';
import clsx from 'clsx';

export interface ChartLayoutProps {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  children: ReactNode;
  contentIsFlex?: boolean;
  contentClassName?: string;
  contentRef?: Ref<HTMLDivElement>;
  isLoading?: boolean;
}
export function ChartLayout(props: ChartLayoutProps) {
  const {
    title,
    description,
    children,
    className,
    contentIsFlex = true,
    contentClassName,
    contentRef,
  } = props;

  return (
    <div
      className={clsx(
        'border rounded min-h-440 h-full flex flex-col flex-auto',
        className
      )}
    >
      <div className="text-xs p-14 flex-shrink-0 flex justify-between">
        <div className="font-semibold text-sm">{title}</div>
        {description && <div className="text-muted">{description}</div>}
      </div>
      <div
        ref={contentRef}
        className={clsx(
          'p-14 relative',
          contentIsFlex && 'flex-auto flex items-center justify-center',
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
