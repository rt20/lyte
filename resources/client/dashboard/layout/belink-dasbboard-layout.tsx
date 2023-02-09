import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {DashboardSidenav} from '@common/ui/layout/dashboard-sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import {Outlet} from 'react-router-dom';
import {DashboardNavbar} from '@common/ui/layout/dashboard-navbar';
import {BelinkDashboardSidenav} from './sidenav/belink-dashboard-sidenav';
import {useContext} from 'react';
import {DashboardLayoutContext} from '@common/ui/layout/dashboard-layout-context';
import {UpgradeButton} from '@app/dashboard/layout/sidenav/upgrade-button';
import {Button} from '@common/ui/buttons/button';
import {KeyboardArrowDownIcon} from '@common/icons/material/KeyboardArrowDown';
import {Trans} from '@common/i18n/trans';
import {WorkspaceSelector} from '@common/workspace/workspace-selector';
import {Footer} from '@common/ui/footer/footer';
import {useSettings} from '@common/core/settings/use-settings';
import {AdHost} from '@common/admin/ads/ad-host';

export function BelinkDashboardLayout() {
  const {
    links: {dash_footer},
  } = useSettings();
  return (
    <DashboardLayout name="belink-dashboard" leftSidenavCanBeCompact>
      <BelinkNavbar />
      <DashboardSidenav position="left">
        <BelinkDashboardSidenav />
      </DashboardSidenav>
      <DashboardContent>
        <div className="bg dark:bg-alt">
          <AdHost slot="dashboard" className="mt-50 mb-20" />
          <Outlet />
          {dash_footer && (
            <Footer padding="px-16 md:px-28 pt-24 pb-28 md:pb-24" />
          )}
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
}

interface DashboardNavbarProps {}
function BelinkNavbar(props: DashboardNavbarProps) {
  const {billing} = useSettings();
  const {leftSidenavStatus} = useContext(DashboardLayoutContext);
  return (
    <DashboardNavbar
      {...props}
      size="sm"
      color="primary"
      menuPosition="dashboard-navbar"
      rightChildren={
        leftSidenavStatus === 'compact' && (
          <UpgradeButton variant="flat" color="paper" />
        )
      }
    >
      {leftSidenavStatus === 'compact' && billing?.enable && (
        <WorkspaceSelector
          trigger={
            <Button variant="text" endIcon={<KeyboardArrowDownIcon />}>
              <Trans message="Workspaces" />
            </Button>
          }
        />
      )}
    </DashboardNavbar>
  );
}
