import {ColumnConfig} from '@common/datatable/column-config';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {TrackingPixel} from '@app/dashboard/tracking-pixels/tracking-pixel';
import {SupportedTrackingPixels} from '@app/dashboard/tracking-pixels/supported-tracking-pixels';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import {UpdatePixelDialog} from '@app/dashboard/tracking-pixels/crupdate-dialog/update-pixel-dialog';
import {PermissionAwareButton} from '@app/dashboard/upgrade/permission-aware-button';

export const TrackingPixelsDatatableColumns: ColumnConfig<TrackingPixel>[] = [
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Name" />,
    body: pixel => pixel.name,
  },
  {
    key: 'type',
    allowsSorting: true,
    header: () => <Trans message="Type" />,
    body: pixel => {
      const docsUrl = SupportedTrackingPixels.find(
        p => p.name === pixel.type
      )?.docsUrl;

      return (
        <div>
          <div className="flex items-center gap-10">
            {docsUrl ? <RemoteFavicon url={docsUrl} /> : null}
            {docsUrl ? (
              <a
                href={docsUrl}
                target="_blank"
                rel="noreferrer"
                className={LinkStyle}
              >
                {pixel.type}
              </a>
            ) : (
              pixel.type
            )}
          </div>
        </div>
      );
    },
  },
  {
    key: 'user_id',
    allowsSorting: true,
    header: () => <Trans message="Owner" />,
    body: pixel => {
      if (!pixel.user) return '';
      return (
        <NameWithAvatar
          image={pixel.user.avatar}
          label={pixel.user.display_name}
          description={pixel.user.email}
        />
      );
    },
  },
  {
    key: 'pixel_id',
    header: () => <Trans message="Pixel ID" />,
    body: pixel => pixel.pixel_id,
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
    body: pixel => {
      return (
        <PermissionAwareButton resource={pixel} action="update">
          <DialogTrigger type="modal">
            <IconButton className="text-muted">
              <EditIcon />
            </IconButton>
            <UpdatePixelDialog pixel={pixel} />
          </DialogTrigger>
        </PermissionAwareButton>
      );
    },
  },
];
