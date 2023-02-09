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
import {SupportedTrackingPixels} from '@app/dashboard/tracking-pixels/supported-tracking-pixels';

export const TrackingPixelsDatatableFilters: BackendFilter[] = [
  new BackendFilter({
    type: FilterControlType.Select,
    key: 'type',
    label: message('Type'),
    description: message('Type of the pixel'),
    options: SupportedTrackingPixels.map((pixel, index) => {
      return {key: pixel.name, value: pixel.name, label: message(pixel.name)};
    }),
  }),
  new CreatedAtFilter({
    description: message('Date pixel was created'),
  }),
  new UpdatedAtFilter({
    description: message('Date pixel was last updated'),
  }),
  new BackendFilter({
    type: FilterControlType.SelectModel,
    model: USER_MODEL,
    key: 'user_id',
    label: message('Owner'),
    description: message('User pixel belongs to'),
  }),
];
