import {ReactNode} from 'react';
import clsx from 'clsx';

interface SectionHelperProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  color?: 'positive' | 'danger' | 'warning' | 'primary';
  className?: string;
}
export function SectionHelper({
  title,
  description,
  actions,
  color = 'primary',
  className,
}: SectionHelperProps) {
  return (
    <div
      className={clsx(
        className,
        'p-10 rounded border-l-4',
        color === 'positive' && 'bg-positive/focus border-l-positive',
        color === 'warning' && 'bg-warning/focus border-l-warning',
        color === 'danger' && 'bg-danger/focus border-l-danger',
        color === 'primary' && 'bg-primary/focus border-l-primary'
      )}
    >
      {title && <div className="text-sm mb-4 font-medium">{title}</div>}
      {description && <div className="text-sm">{description}</div>}
      {actions && <div className="mt-14">{actions}</div>}
    </div>
  );
}
