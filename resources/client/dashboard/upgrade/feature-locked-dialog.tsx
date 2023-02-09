import {UpgradeDialog} from '@app/dashboard/upgrade/upgrade-dialog';
import {Trans} from '@common/i18n/trans';
import {ReactNode} from 'react';

interface FeatureLockedDialogProps {
  message?: ReactNode;
}
export function FeatureLockedDialog({message}: FeatureLockedDialogProps) {
  return (
    <UpgradeDialog
      message={message}
      messageSuffix={
        <Trans message="Upgrade to unlock this feature and many more." />
      }
    />
  );
}
