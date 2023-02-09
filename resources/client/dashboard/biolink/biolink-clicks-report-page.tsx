import {Trans} from '@common/i18n/trans';
import React from 'react';
import {ClicksReportPageLayout} from '@app/dashboard/reports/clicks/clicks-report-page-layout';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useParams} from 'react-router-dom';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';
import clsx from 'clsx';
import {useBiolink} from '@app/dashboard/biolink/biolinks-datatable-page/requests/use-biolink';

export function BiolinkClicksReportPage() {
  const navigate = useNavigate();
  const {biolinkId} = useParams();
  const query = useBiolink();
  const biolink = query.data?.biolink;

  return (
    <ClicksReportPageLayout
      model={`biolink=${biolinkId}`}
      title={
        <Breadcrumb size="xl" className={clsx(query.isLoading && 'invisible')}>
          <BreadcrumbItem
            onSelected={() => {
              navigate('..', {relative: 'path'});
            }}
          >
            <Trans message="Biolinks" />
          </BreadcrumbItem>
          <BreadcrumbItem className="first-letter:capitalize">
            <Trans message="“:name“ clicks" values={{name: biolink?.name}} />
          </BreadcrumbItem>
        </Breadcrumb>
      }
      actions={
        biolink && (
          <ShareLinkButton
            className="flex-shrink-0 text-muted"
            link={biolink}
          />
        )
      }
    />
  );
}
