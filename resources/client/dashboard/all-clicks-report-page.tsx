import {Trans} from '@common/i18n/trans';
import React from 'react';
import {ClicksReportPageLayout} from '@app/dashboard/reports/clicks/clicks-report-page-layout';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {useAuth} from '@common/auth/use-auth';

export function AllClicksReportPage() {
  const {workspaceId} = useActiveWorkspaceId();
  const {user} = useAuth();

  const model =
    workspaceId && workspaceId > 0
      ? `workspace=${workspaceId}`
      : `user=${user?.id}`;

  return (
    <ClicksReportPageLayout
      model={model}
      title={
        <h1 className="text-3xl font-light">
          <Trans message="Clicks report" />
        </h1>
      }
    />
  );
}
