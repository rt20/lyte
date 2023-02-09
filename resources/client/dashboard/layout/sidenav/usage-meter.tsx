import {useLinkSummary} from './use-link-summary';
import clsx from 'clsx';
import {Trans} from '@common/i18n/trans';
import {Meter} from '@common/ui/progress/meter';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {UsageDetailsTrigger} from '@app/dashboard/layout/sidenav/usage-details-trigger';

export function UsageMeter() {
  const {isLoading, data} = useLinkSummary();
  const links = data?.usage.links;

  // prevent layout shift while usage is loading
  if (!links) {
    return <div className="h-[53px] pt-24 mt-24 border-t" />;
  }

  // prevent translation placeholders from showing if summary is not loaded yet
  const label = (
    <span className={clsx('whitespace-nowrap', isLoading && 'invisible')}>
      {links.total ? (
        <Trans
          message=":used of :available links created"
          values={{
            used: <FormattedNumber value={links.used} />,
            available: <FormattedNumber value={links.total} />,
          }}
        />
      ) : (
        <Trans message=":count links created" values={{count: links.used}} />
      )}
    </span>
  );
  return (
    <div className="border-t items-start gap-8 flex pl-6 pt-24 mt-24">
      <UsageDetailsTrigger className="-mt-14" />
      <Meter
        className="flex-auto max-w-144"
        size="xs"
        value={links.total && links.used ? (links.used / links.total) * 100 : 0}
        label={label}
        showValueLabel={false}
        labelPosition="bottom"
      />
    </div>
  );
}
