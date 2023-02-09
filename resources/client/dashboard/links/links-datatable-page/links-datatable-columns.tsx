import {ColumnConfig} from '@common/datatable/column-config';
import {Link} from '../link';
import {Trans} from '@common/i18n/trans';
import {removeProtocol} from '@common/utils/urls/remove-protocol';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {CheckIcon} from '@common/icons/material/Check';
import {CloseIcon} from '@common/icons/material/Close';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Link as RouterLink} from 'react-router-dom';
import {IconButton} from '@common/ui/buttons/icon-button';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {EditIcon} from '@common/icons/material/Edit';
import {UpdateLinkDialog} from '../dialogs/update-link-dialog';
import React from 'react';
import {LinkImage} from '@app/dashboard/links/link-image';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';
import {LinkClipboardButton} from '@app/dashboard/links/sharing/link-clipboard-button';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';
import {BarChartIcon} from '@common/icons/material/BarChart';

export const linksDatatableColumns: ColumnConfig<Link>[] = [
  {
    key: 'summary',
    header: () => <Trans message="Summary" />,
    // prevent long urls from overflowing the table
    width: 'w-5/6 max-w-200',
    body: link => (
      <div>
        <div className="flex items-center gap-6 whitespace-nowrap">
          <LinkImage link={link} className="w-16 h-16" />
          <a
            className="block font-semibold hover:underline overflow-ellipsis overflow-hidden w-min"
            href={link.long_url}
            target="_blank"
            rel="noreferrer"
            data-testid="long-url"
          >
            {removeProtocol(link.long_url)}
          </a>
        </div>
        <LinkClipboardButton
          link={link}
          variant="text"
          className="block text-muted hover:underline w-min"
          data-testid="short-url"
        />
      </div>
    ),
  },
  {
    key: 'user_id',
    allowsSorting: true,
    header: () => <Trans message="Owner" />,
    body: link => {
      if (!link.user) return '';
      return (
        <NameWithAvatar
          image={link.user.avatar}
          label={link.user.display_name}
          description={link.user.email}
        />
      );
    },
  },
  {
    key: 'clicks',
    sortingKey: 'clicks_count',
    allowsSorting: true,
    header: () => <Trans message="Clicks" />,
    body: link =>
      link.clicks_count ? <FormattedNumber value={link.clicks_count} /> : '',
  },
  {
    key: 'type',
    sortingKey: 'type',
    allowsSorting: true,
    header: () => <Trans message="Type" />,
    body: link => (
      <Chip size="xs" radius="rounded" className="capitalize">
        <Trans message={link.type} />
      </Chip>
    ),
  },
  {
    key: 'password',
    allowsSorting: true,
    header: () => <Trans message="Password" />,
    body: link =>
      link.has_password ? (
        <CheckIcon className="icon-md text-positive" />
      ) : (
        <CloseIcon className="icon-md text-danger" />
      ),
  },
  {
    key: 'expires_at',
    allowsSorting: true,
    header: () => <Trans message="Expires at" />,
    body: link =>
      link.expires_at ? <FormattedDate date={link.expires_at} /> : '',
  },
  {
    key: 'clicked_at',
    allowsSorting: true,
    header: () => <Trans message="Last clicked" />,
    body: link =>
      link.clicked_at ? <FormattedDate date={link.clicked_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    body: link => (
      <div className="text-muted">
        <Tooltip label={<Trans message="Link statistics" />}>
          <RouterLink to={`${link.id}`}>
            <IconButton size="md">
              <BarChartIcon />
            </IconButton>
          </RouterLink>
        </Tooltip>
        <ShareLinkButton link={link} />
        <PermissionAwareButton resource={link} action="update">
          <DialogTrigger type="modal">
            <Tooltip label={<Trans message="Edit link" />}>
              <IconButton size="md">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <UpdateLinkDialog link={link} />
          </DialogTrigger>
        </PermissionAwareButton>
      </div>
    ),
  },
];
