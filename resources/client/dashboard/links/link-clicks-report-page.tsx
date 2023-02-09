import {Trans} from '@common/i18n/trans';
import React from 'react';
import {ClicksReportPageLayout} from '@app/dashboard/reports/clicks/clicks-report-page-layout';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useParams} from 'react-router-dom';
import {useLink} from '@app/dashboard/layout/sidenav/use-link';
import clsx from 'clsx';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';

export function LinkClicksReportPage() {
  const navigate = useNavigate();
  const {linkId} = useParams();
  const query = useLink(linkId!);
  const link = query.data?.link;

  return (
    <ClicksReportPageLayout
      model={`link=${linkId}`}
      title={
        <Breadcrumb size="xl" className={clsx(query.isLoading && 'invisible')}>
          <BreadcrumbItem
            onSelected={() => {
              navigate('..', {relative: 'path'});
            }}
          >
            <Trans message="Links" />
          </BreadcrumbItem>
          <BreadcrumbItem className="first-letter:capitalize">
            <Trans message="“:name“ clicks" values={{name: link?.name}} />
          </BreadcrumbItem>
        </Breadcrumb>
      }
      actions={
        link && (
          <ShareLinkButton className="flex-shrink-0 text-muted" link={link} />
        )
      }
    />
  );
}
