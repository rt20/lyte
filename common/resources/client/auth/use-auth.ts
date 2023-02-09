import {User} from './user';
import {useCallback, useContext} from 'react';
import {SiteConfigContext} from '../core/settings/site-config-context';
import {getFromLocalStorage} from '../utils/hooks/local-storage';
import {useBootstrapData} from '../core/bootstrap-data/bootstrap-data-context';

interface UseAuthReturn {
  user: User | null;
  hasPermission: (permission: string | number) => boolean;
  isLoggedIn: boolean;
  isSubscribed: boolean;
  getRedirectUri: () => string;
}
export function useAuth(): UseAuthReturn {
  const {
    data: {user, guest_role},
  } = useBootstrapData();
  const {
    auth: {redirectUri = '/'},
  } = useContext(SiteConfigContext);

  const hasPermission = useCallback(
    (permission: string | number): boolean => {
      const permissions = user?.permissions || guest_role?.permissions;
      if (!permissions) return false;

      const isAdmin = permissions.find(p => p.name === 'admin') != null;
      return isAdmin || permissions.find(p => p.name === permission) != null;
    },
    [user?.permissions, guest_role?.permissions]
  );

  const isSubscribed = user?.subscriptions?.find(sub => sub.valid) != null;

  const getRedirectUri = useCallback(() => {
    const onboarding = getFromLocalStorage('be.onboarding.selected');
    if (onboarding) {
      return `/checkout/${onboarding.productId}/${onboarding.priceId}`;
    }
    return redirectUri;
  }, [redirectUri]);

  return {
    user,
    hasPermission,
    isLoggedIn: !!user,
    isSubscribed,
    // where to redirect user after successful login
    getRedirectUri: getRedirectUri,
  };
}
