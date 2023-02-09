import {useAuth} from '@common/auth/use-auth';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useLogout} from '@common/auth/requests/logout';
import {useCustomMenu} from '@common/menus/use-custom-menu';
import {useThemeSelector} from '@common/ui/themes/theme-selector-context';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {useSettings} from '@common/core/settings/use-settings';
import {Badge} from '@common/ui/badge/badge';
import {IconButton} from '@common/ui/buttons/icon-button';
import {PersonIcon} from '@common/icons/material/Person';
import {ButtonBase} from '@common/ui/buttons/button-base';
import {ArrowDropDownIcon} from '@common/icons/material/ArrowDropDown';
import {
  Menu,
  MenuItem,
  MenuTrigger,
} from '@common/ui/navigation/menu/menu-trigger';
import {NotificationsIcon} from '@common/icons/material/Notifications';
import {Trans} from '@common/i18n/trans';
import {PaymentsIcon} from '@common/icons/material/Payments';
import {createSvgIconFromTree} from '@common/icons/create-svg-icon';
import {DarkModeIcon} from '@common/icons/material/DarkMode';
import {LightModeIcon} from '@common/icons/material/LightMode';
import {ExitToAppIcon} from '@common/icons/material/ExitToApp';

export function NavbarAuthUser() {
  const {user, isSubscribed} = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const menu = useCustomMenu('auth-dropdown');
  const {selectedTheme, selectTheme} = useThemeSelector();
  const isMobile = useIsMobileMediaQuery();
  const {notifications} = useSettings();
  if (!selectedTheme || !user) return null;
  const hasUnreadNotif = !!user.unread_notifications_count;

  const mobileButton = (
    <Badge
      badgeLabel={user?.unread_notifications_count}
      badgeIsVisible={hasUnreadNotif}
    >
      <IconButton size="md">
        <PersonIcon />
      </IconButton>
    </Badge>
  );
  const desktopButton = (
    <ButtonBase className="flex items-center">
      <img
        className="w-32 h-32 object-cover flex-shrink-0 rounded mr-12"
        src={user.avatar}
        alt=""
      />
      <span className="block text-sm mr-2">{user.display_name}</span>
      <ArrowDropDownIcon className="block icon-sm" />
    </ButtonBase>
  );

  const notifMenuItem = (
    <MenuItem
      value="notifications"
      startIcon={<NotificationsIcon />}
      onSelected={() => {
        navigate('/notifications');
      }}
    >
      <Trans message="Notifications" />
      {hasUnreadNotif ? ` (${user.unread_notifications_count})` : undefined}
    </MenuItem>
  );

  const billingMenuItem = (
    <MenuItem
      value="billing"
      startIcon={<PaymentsIcon />}
      onSelected={() => {
        navigate('/billing');
      }}
    >
      <Trans message="Billing" />
    </MenuItem>
  );

  return (
    <MenuTrigger>
      {isMobile ? mobileButton : desktopButton}
      <Menu>
        {menu &&
          menu.items.map(item => {
            const Icon = item.icon && createSvgIconFromTree(item.icon);
            return (
              <MenuItem
                value={item.id}
                key={item.id}
                startIcon={Icon && <Icon />}
                onSelected={() => {
                  navigate(item.action);
                }}
              >
                <Trans message={item.label} />
              </MenuItem>
            );
          })}
        {isMobile && notifications?.integrated ? notifMenuItem : undefined}
        {isSubscribed && billingMenuItem}
        {!selectedTheme.is_dark && (
          <MenuItem
            value="light"
            startIcon={<DarkModeIcon />}
            onSelected={() => {
              selectTheme('dark');
            }}
          >
            <Trans message="Dark mode" />
          </MenuItem>
        )}
        {selectedTheme.is_dark && (
          <MenuItem
            value="dark"
            startIcon={<LightModeIcon />}
            onSelected={() => {
              selectTheme('light');
            }}
          >
            <Trans message="Light mode" />
          </MenuItem>
        )}
        <MenuItem
          value="logout"
          startIcon={<ExitToAppIcon />}
          onSelected={() => {
            logout.mutate();
          }}
        >
          <Trans message="Log out" />
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
