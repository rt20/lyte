import {useAuth} from '@common/auth/use-auth';
import {FormattedDate} from '@common/i18n/formatted-date';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {InfoIcon} from '@common/icons/material/Info';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {Trans} from '@common/i18n/trans';
import {ResourceUsageList} from '@app/dashboard/layout/sidenav/resource-usage-list';

interface UsageDetailsTriggerProps {
  className?: string;
}
export function UsageDetailsTrigger({className}: UsageDetailsTriggerProps) {
  const {user} = useAuth();
  const subscription = user?.subscriptions?.[0];
  const planName = subscription?.product?.name;
  const renewalDate = subscription?.renews_at ? (
    <FormattedDate date={subscription.renews_at} />
  ) : null;

  return (
    <DialogTrigger type="popover" triggerOnHover>
      <IconButton size="md" className={className}>
        <InfoIcon />
      </IconButton>
      <Dialog size="auto">
        <DialogBody>
          <div className="border-b pb-10 mb-10">
            <div className="font-semibold">
              <Trans
                message="Current plan: :planName"
                values={{
                  planName: planName || <Trans message="Free" />,
                }}
              />
            </div>
            <div className="text-muted text-xs">
              <Trans
                message="Next payment: :date"
                values={{
                  date: renewalDate || <Trans message="Never" />,
                }}
              />
            </div>
          </div>
          <ResourceUsageList />
        </DialogBody>
      </Dialog>
    </DialogTrigger>
  );
}
