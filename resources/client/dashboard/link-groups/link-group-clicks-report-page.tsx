import {Trans} from '@common/i18n/trans';
import React from 'react';
import {ClicksReportPageLayout} from '@app/dashboard/reports/clicks/clicks-report-page-layout';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useParams} from 'react-router-dom';
import {useLinkGroup} from '@app/dashboard/link-groups/link-group-links-datatable-page/requests/use-link-group';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';
import clsx from 'clsx';

export function LinkGroupClicksReportPage() {
  const navigate = useNavigate();
  const {groupId} = useParams();
  const query = useLinkGroup(groupId!);
  const group = query.data?.linkGroup;

  return (
    <ClicksReportPageLayout
      model={`link-group=${groupId}`}
      title={
        <Breadcrumb size="xl" className={clsx(query.isLoading && 'invisible')}>
          <BreadcrumbItem
            onSelected={() => {
              navigate('..', {relative: 'path'});
            }}
          >
            <Trans message="Link groups" />
          </BreadcrumbItem>
          <BreadcrumbItem className="first-letter:capitalize">
            <Trans message="“:name“ clicks" values={{name: group?.name}} />
          </BreadcrumbItem>
        </Breadcrumb>
      }
      actions={
        group && (
          <ShareLinkButton className="flex-shrink-0 text-muted" link={group} />
        )
      }
    />
  );
}
