import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {CheckIcon} from '@common/icons/material/Check';
import {CloseIcon} from '@common/icons/material/Close';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Link as RouterLink} from 'react-router-dom';
import {IconButton} from '@common/ui/buttons/icon-button';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {EditIcon} from '@common/icons/material/Edit';
import React from 'react';
import {LinkGroup} from '../link-group';
import {ListAltIcon} from '@common/icons/material/ListAlt';
import {UpdateLinkGroupDialog} from '@app/dashboard/link-groups/link-groups-datatable-page/crupdate/update-link-group-dialog';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {BarChartIcon} from '@common/icons/material/BarChart';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';

export const LinkGroupsDatatableColumns: ColumnConfig<LinkGroup>[] = [
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Name" />,
    // prevent long names from overflowing the table
    width: 'w-5/6 max-w-200',
    body: group => (
      <a
        href={group.short_url}
        target="_blank"
        rel="noreferrer"
        className={LinkStyle}
      >
        {group.name}
      </a>
    ),
  },
  {
    key: 'user_id',
    allowsSorting: true,
    header: () => <Trans message="Owner" />,
    body: group => {
      if (!group.user) return '';
      return (
        <NameWithAvatar
          image={group.user.avatar}
          label={group.user.display_name}
          description={group.user.email}
        />
      );
    },
  },
  {
    key: 'links_count',
    allowsSorting: true,
    header: () => <Trans message="Links" />,
    body: group =>
      group.links_count ? <FormattedNumber value={group.links_count} /> : '-',
  },
  {
    key: 'active',
    allowsSorting: true,
    header: () => <Trans message="Active" />,
    body: group =>
      group.active ? (
        <CheckIcon className="icon-md text-positive" />
      ) : (
        <CloseIcon className="icon-md text-danger" />
      ),
  },
  {
    key: 'rotator',
    allowsSorting: true,
    header: () => <Trans message="Rotator" />,
    body: group =>
      group.rotator ? (
        <CheckIcon className="icon-md text-positive" />
      ) : (
        <CloseIcon className="icon-md text-danger" />
      ),
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    header: () => <Trans message="Last updated" />,
    body: link =>
      link.updated_at ? <FormattedDate date={link.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    body: group => (
      <div className="text-muted">
        <Tooltip label={<Trans message="Clicks report" />}>
          <RouterLink to={`${group.id}`}>
            <IconButton size="md">
              <BarChartIcon />
            </IconButton>
          </RouterLink>
        </Tooltip>
        <Tooltip label={<Trans message="Manage links" />}>
          <RouterLink to={`${group.id}/links`}>
            <IconButton size="md">
              <ListAltIcon />
            </IconButton>
          </RouterLink>
        </Tooltip>
        <ShareLinkButton link={group} />
        <PermissionAwareButton resource={group} action="update">
          <DialogTrigger type="modal">
            <Tooltip label={<Trans message="Edit link" />}>
              <IconButton size="md">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <UpdateLinkGroupDialog group={group} />
          </DialogTrigger>
        </PermissionAwareButton>
      </div>
    ),
  },
];
