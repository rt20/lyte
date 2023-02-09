import {
  LinkFeaturePermissions,
  useLinkSummary,
} from '@app/dashboard/layout/sidenav/use-link-summary';
import {useAuth} from '@common/auth/use-auth';

export function useLinkFeatureStatus(feature: keyof LinkFeaturePermissions) {
  const {data} = useLinkSummary();
  const {hasPermission} = useAuth();

  const disabled: boolean =
    !data?.usage.links[feature] && !hasPermission('admin');
  return {disabled};
}
