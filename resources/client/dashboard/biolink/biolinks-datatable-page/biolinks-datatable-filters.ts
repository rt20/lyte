import {
  ALL_PRIMITIVE_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {
  CreatedAtFilter,
  UpdatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {USER_MODEL} from '@common/auth/user';

export const BiolinksDatatableFilters: BackendFilter[] = [
  new BackendFilter({
    type: FilterControlType.Select,
    key: 'active',
    label: message('Status'),
    description: message('Whether biolink is disabled or not'),
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
    type: FilterControlType.Input,
    inputType: 'number',
    key: 'clicks_count',
    label: message('Clicks count'),
    description: message('Number of times this biolink was visited'),
    defaultValue: 1,
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
  }),
  new BackendFilter({
    type: FilterControlType.Input,
    inputType: 'number',
    key: 'links_count',
    label: message('Link count'),
    description: message('Number of links in the biolink'),
    defaultValue: 1,
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
  }),
  new CreatedAtFilter({
    description: message('Date biolink was created'),
  }),
  new UpdatedAtFilter({
    description: message('Date biolink was last updated'),
  }),
  new BackendFilter({
    type: FilterControlType.SelectModel,
    model: USER_MODEL,
    key: 'user_id',
    label: message('User'),
    description: message('User biolink was created by'),
  }),
];
