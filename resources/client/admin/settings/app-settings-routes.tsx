import {RouteObject} from 'react-router-dom';
import {LinkSettings} from '@app/admin/settings/link-settings';

export const AppSettingsRoutes: RouteObject[] = [
  {path: 'links', element: <LinkSettings />},
];
