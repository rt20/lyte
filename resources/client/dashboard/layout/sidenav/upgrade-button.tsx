import {Button, ButtonProps} from '@common/ui/buttons/button';
import {Link} from 'react-router-dom';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {useAuth} from '@common/auth/use-auth';

export function UpgradeButton(props: ButtonProps) {
  const {isSubscribed} = useAuth();
  return (
    <Button
      elementType={Link}
      to={isSubscribed ? '/billing/change-plan' : '/pricing'}
      variant="outline"
      color="primary"
      size="xs"
      {...props}
    >
      <Trans message="Upgrade" />
    </Button>
  );
}
