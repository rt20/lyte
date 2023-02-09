import {ColumnConfig} from '@common/datatable/column-config';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';
import {Link} from 'react-router-dom';
import {ColorIcon} from '@common/admin/appearance/sections/themes/color-icon';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';

export const LinkOverlaysDatatableColumns: ColumnConfig<LinkOverlay>[] = [
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Name" />,
    body: overlay => overlay.name,
  },
  {
    key: 'message',
    allowsSorting: true,
    header: () => <Trans message="Message" />,
    body: overlay => overlay.message,
  },
  {
    key: 'btn_text',
    allowsSorting: true,
    header: () => <Trans message="Button text" />,
    body: overlay => overlay.btn_text,
  },
  {
    key: 'color',
    header: () => <Trans message="Color" />,
    body: overlay => (
      <ColorIcon
        viewBox="0 0 48 48"
        className="icon-lg"
        style={{fill: overlay.colors['bg-color']}}
      />
    ),
  },
  {
    key: 'user_id',
    allowsSorting: true,
    header: () => <Trans message="Owner" />,
    body: overlay => {
      if (!overlay.user) return '';
      return (
        <NameWithAvatar
          image={overlay.user.avatar}
          label={overlay.user.display_name}
          description={overlay.user.email}
        />
      );
    },
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    header: () => <Trans message="Last updated" />,
    body: pixel =>
      pixel.updated_at ? <FormattedDate date={pixel.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    body: overlay => {
      return (
        <PermissionAwareButton resource={overlay} action="update">
          <IconButton
            className="text-muted"
            elementType={Link}
            to={`${overlay.id}/edit`}
          >
            <EditIcon />
          </IconButton>
        </PermissionAwareButton>
      );
    },
  },
];
