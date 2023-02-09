import clsx from 'clsx';
import {CustomMenu} from '@common/menus/custom-menu';
import React from 'react';
import {WorkspaceSelector} from '@common/workspace/workspace-selector';
import {UsageMeter} from './usage-meter';
import {useSettings} from '@common/core/settings/use-settings';
import {UpgradeButton} from '@app/dashboard/layout/sidenav/upgrade-button';
import {UsageDetailsTrigger} from '@app/dashboard/layout/sidenav/usage-details-trigger';

interface Props {
  className?: string;
  isCompactMode?: boolean;
}
export function BelinkDashboardSidenav({className, isCompactMode}: Props) {
  const {billing} = useSettings();

  return (
    <div
      className={clsx(
        'text-sm pt-26 text-muted font-medium bg-alt flex flex-col gap-20 border-r overflow-y-auto relative',
        className
      )}
    >
      <div className="flex-auto px-12">
        <CustomMenu
          matchDescendants={to => to === '/dashboard'}
          menu="dashboard-sidebar"
          orientation="vertical"
          onlyShowIcons={isCompactMode}
          gap="gap-8"
          itemClassName={({isActive}) =>
            clsx(
              'block w-full rounded py-12 px-16 border-l-4',
              isActive
                ? 'bg-primary/hover border-l-primary'
                : 'border-l-transparent hover:bg-hover'
            )
          }
        />
        {!isCompactMode && <UsageMeter />}
        {billing.enable && !isCompactMode && (
          <div className="mt-14 pl-60">
            <UpgradeButton />
          </div>
        )}
      </div>
      {!isCompactMode && (
        <WorkspaceSelector className="w-full px-24 py-18 border-t flex-shrink-0 mt-auto" />
      )}
      {isCompactMode && (
        <UsageDetailsTrigger className="flex-shrink-0 mx-auto mb-10" />
      )}
    </div>
  );
}
