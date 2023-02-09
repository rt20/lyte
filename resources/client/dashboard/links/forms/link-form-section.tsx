import {ReactElement, ReactNode} from 'react';
import {NoPermissionButton} from '@app/dashboard/upgrade/no-permission-button';
import clsx from 'clsx';

interface LinkFormSectionProps {
  title: ReactElement;
  description: ReactElement;
  children: ReactNode;
  upgradeMessage?: ReactNode;
}
export function LinkFormSection({
  title,
  description,
  children,
  upgradeMessage,
}: LinkFormSectionProps) {
  return (
    <div className="border-t pt-24">
      <div
        className={clsx(
          'font-semibold',
          upgradeMessage && 'flex items-center gap-10 mb-8'
        )}
      >
        <div className="text-sm">{title}</div>
        {upgradeMessage && <NoPermissionButton message={upgradeMessage} />}
      </div>
      <div className="text-muted text-sm">{description}</div>
      {children}
    </div>
  );
}
