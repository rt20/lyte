import {useAuth} from '../use-auth';
import {ReactElement} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAppearanceEditorMode} from '../../admin/appearance/commands/use-appearance-editor-mode';

interface GuestRouteProps {
  children: ReactElement;
}
export function GuestRoute({children}: GuestRouteProps) {
  const {isLoggedIn, getRedirectUri} = useAuth();
  const {isAppearanceEditorActive} = useAppearanceEditorMode();

  if (isLoggedIn && !isAppearanceEditorActive) {
    return <Navigate to={getRedirectUri()} replace />;
  }

  return children || <Outlet />;
}
