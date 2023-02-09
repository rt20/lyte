import {LockIcon} from '@common/icons/material/Lock';
import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ReactNode} from 'react';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {useSettings} from '@common/core/settings/use-settings';
import {FeatureLockedDialog} from '@app/dashboard/upgrade/feature-locked-dialog';

interface UpgradeButtonProps {
  message?: ReactNode;
  className?: string;
}
export function NoPermissionButton({message, className}: UpgradeButtonProps) {
  const {billing} = useSettings();

  if (!billing.enable) {
    return <GenericButton />;
  }

  return (
    <DialogTrigger type="popover">
      <Button
        variant="flat"
        color="primary"
        size="2xs"
        startIcon={<LockIcon />}
        className={className}
      >
        <Trans message="Upgrade" />
      </Button>
      <FeatureLockedDialog message={message} />
    </DialogTrigger>
  );
}

function GenericButton() {
  return (
    <Tooltip
      label={
        <Trans message="You don't have permissions to access this feature." />
      }
    >
      <LockIcon size="sm" className="text-muted" />
    </Tooltip>
  );
}
