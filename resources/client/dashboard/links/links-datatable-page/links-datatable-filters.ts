import {
  ALL_PRIMITIVE_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {
  CreatedAtFilter,
  TimestampFilter,
  UpdatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {USER_MODEL} from '@common/auth/user';

export const LinksDatatableFilters: BackendFilter[] = [
  new BackendFilter({
    type: FilterControlType.Select,
    key: 'type',
    label: message('Type'),
    description: message('Type of the link'),
    defaultValue: '01',
    defaultOperator: FilterOperator.eq,
    options: [
      {
        key: '01',
        label: message('Direct'),
        value: 'direct',
      },
      {
        key: '02',
        label: message('Overlay'),
        value: 'overlay',
      },
      {
        key: '03',
        label: message('Frame'),
        value: 'frame',
      },
      {
        key: '04',
        label: message('Custom page'),
        value: 'link_page',
      },
    ],
  }),
  new BackendFilter({
    type: FilterControlType.Select,
    key: 'active',
    label: message('Status'),
    description: message('Whether link is disabled or not'),
    defaultValue: '01',
    defaultOperator: FilterOperator.eq,
    options: [
      {
        key: '01',
        label: message('Enabled'),
        value: true,
      },
      {
        key: '02',
        label: message('Disabled'),
        value: false,
      },
    ],
  }),
  new BackendFilter({
    type: FilterControlType.Select,
    key: 'password',
    label: message('Password'),
    description: message('Whether link is password protected'),
    defaultValue: '01',
    defaultOperator: FilterOperator.eq,
    options: [
      {
        key: '01',
        label: message('Has a password'),
        value: {value: null, operator: FilterOperator.ne},
      },
      {
        key: '02',
        label: message('Does not have a password'),
        value: {value: null, operator: FilterOperator.eq},
      },
    ],
  }),
  new BackendFilter({
    type: FilterControlType.Input,
    inputType: 'number',
    key: 'clicks_count',
    label: message('Click count'),
    description: message('Total number of clicks for link'),
    defaultValue: 1,
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
  }),
  new TimestampFilter({
    key: 'clicked_at',
    label: message('Clicked at'),
    description: message('Date link was last clicked'),
  }),
  new TimestampFilter({
    key: 'expires_at',
    label: message('Expires at'),
    description: message('Date link will expire'),
  }),
  new CreatedAtFilter({
    description: message('Date link was created'),
  }),
  new UpdatedAtFilter({
    description: message('Date link was last updated'),
  }),
  new BackendFilter({
    type: FilterControlType.SelectModel,
    model: USER_MODEL,
    key: 'user_id',
    label: message('User'),
    description: message('User link was created by'),
  }),
];
