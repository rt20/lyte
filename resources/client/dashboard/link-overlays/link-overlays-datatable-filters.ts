import {
  BackendFilter,
  FilterControlType,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {
  CreatedAtFilter,
  UpdatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {USER_MODEL} from '@common/auth/user';
import {
  LinkOverlayPositions,
  LinkOverlayThemes,
} from '@app/dashboard/link-overlays/crupdate/link-overlay-constants';

export const LinkOverlaysDatatableFilters: BackendFilter[] = [
  new BackendFilter({
    type: FilterControlType.Select,
    key: 'theme',
    label: message('Theme'),
    description: message('Theme for the overlay'),
    defaultValue: 'default',
    options: LinkOverlayThemes.map(theme => ({
      key: theme.key,
      value: theme.key,
      label: theme.label,
    })),
  }),
  new BackendFilter({
    type: FilterControlType.Select,
    key: 'position',
    label: message('Position'),
    description: message('Position for the overlay'),
    defaultValue: 'bottom-left',
    options: LinkOverlayPositions.map(position => ({
      key: position.key,
      value: position.key,
      label: position.label,
    })),
  }),
  new CreatedAtFilter({
    description: message('Date overlay was created'),
  }),
  new UpdatedAtFilter({
    description: message('Date overlay was last updated'),
  }),
  new BackendFilter({
    type: FilterControlType.SelectModel,
    model: USER_MODEL,
    key: 'user_id',
    label: message('Owner'),
    description: message('User overlay belongs to'),
  }),
];
