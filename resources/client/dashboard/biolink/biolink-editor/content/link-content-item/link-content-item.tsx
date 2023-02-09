import {removeProtocol} from '@common/utils/urls/remove-protocol';
import {Trans} from '@common/i18n/trans';
import {Switch} from '@common/ui/forms/toggle/switch';
import {Biolink, BiolinkLink} from '@app/dashboard/biolink/biolink';
import {Button} from '@common/ui/buttons/button';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ImageIcon} from '@common/icons/material/Image';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {AnimationIcon} from '@common/icons/material/Animation';
import {ShortcutIcon} from '@common/icons/material/Shortcut';
import {MoreTimeIcon} from '@common/icons/material/MoreTime';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {LinkScheduleDialog} from '@app/dashboard/biolink/biolink-editor/content/link-content-item/link-schedule-dialog';
import {LeapLinkDialog} from '@app/dashboard/biolink/biolink-editor/content/link-content-item/leap-link-dialog';
import {UpdateLinkDialog} from '@app/dashboard/links/dialogs/update-link-dialog';
import {HidableLinkSettingsField} from '@app/dashboard/links/forms/link-settings-form';
import {LinkThumbnailDialog} from '@app/dashboard/biolink/biolink-editor/content/link-content-item/link-thumbnail-dialog';
import {LinkAnimationDialog} from '@app/dashboard/biolink/biolink-editor/content/link-content-item/link-animation-dialog';
import {BarChartIcon} from '@common/icons/material/BarChart';
import {BiolinkContentItemLayout} from '@app/dashboard/biolink/biolink-editor/content/biolink-content-item-layout';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import {Link} from 'react-router-dom';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {useUpdateBiolinkContentItem} from '@app/dashboard/biolink/biolink-editor/requests/use-update-biolink-content-item';
import {
  setEditorBiolink,
  useEditorBiolinkId,
} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';
import {useMediaQuery} from '@common/utils/hooks/use-media-query';

export const linkDialogHiddenFields: HidableLinkSettingsField[] = [
  'groups',
  'seo',
  'enabled',
  'alias',
];

interface LinkContentItemProps {
  item: BiolinkLink;
  biolink: Biolink;
}
export function LinkContentItem({item: link, biolink}: LinkContentItemProps) {
  const biolinkId = useEditorBiolinkId();
  const endpoint = `biolink/${biolinkId}/link/${link.id}`;

  return (
    <BiolinkContentItemLayout
      item={link}
      biolink={biolink}
      title={link.name}
      actionRow={<ActionRow link={link} biolink={biolink} />}
      updateDialog={
        <UpdateLinkDialog
          endpoint={endpoint}
          link={link}
          showButtonLabelField
          hiddenFields={linkDialogHiddenFields}
          onSuccess={(response: {biolink: Biolink}) => {
            setEditorBiolink(response.biolink);
          }}
        />
      }
    >
      <div className="flex items-center gap-6">
        <RemoteFavicon url={link.long_url} />
        <a
          href={link.short_url}
          target="_blank"
          className="hover:underline whitespace-nowrap overflow-hidden overflow-ellipsis text-muted text-sm"
          rel="noreferrer"
        >
          {removeProtocol(link.long_url)}
        </a>
      </div>
    </BiolinkContentItemLayout>
  );
}

interface ActionRowProps {
  link: BiolinkLink;
  biolink: Biolink;
}
function ActionRow({link, biolink}: ActionRowProps) {
  const updateItem = useUpdateBiolinkContentItem();

  return (
    <div className="flex md:gap-24 md:justify-between h-42 items-center">
      <div className="flex items-center text-muted">
        <Switch
          checked={link.active}
          disabled={link.active_locked || updateItem.isLoading}
          onChange={() => {
            updateItem.mutate({
              item: link,
              values: {active: !link.active},
            });
          }}
        />
        <DialogTrigger type="popover">
          <Tooltip label={<Trans message="Change thumbnail" />}>
            <IconButton className="ml-10" color={link.image ? 'primary' : null}>
              <ImageIcon />
            </IconButton>
          </Tooltip>
          <LinkThumbnailDialog link={link} />
        </DialogTrigger>
        <DialogTrigger type="popover">
          <Tooltip label={<Trans message="Animation" />}>
            <IconButton color={link.animation ? 'primary' : null}>
              <AnimationIcon />
            </IconButton>
          </Tooltip>
          <LinkAnimationDialog link={link} />
        </DialogTrigger>
        <DialogTrigger type="popover">
          <Tooltip label={<Trans message="Redirect" />}>
            <IconButton color={link.leap_until ? 'primary' : null}>
              <ShortcutIcon />
            </IconButton>
          </Tooltip>
          <LeapLinkDialog link={link} />
        </DialogTrigger>
        <DialogTrigger type="popover">
          <Tooltip label={<Trans message="Schedule" />}>
            <IconButton
              color={link.expires_at || link.activates_at ? 'primary' : null}
            >
              <MoreTimeIcon />
            </IconButton>
          </Tooltip>
          <LinkScheduleDialog link={link} />
        </DialogTrigger>
      </div>
      <ClicksButton link={link} />
    </div>
  );
}

interface ClicksButtonProps {
  link: BiolinkLink;
}
function ClicksButton({link}: ClicksButtonProps) {
  const isMobile = useIsMobileMediaQuery();
  const isVerySmallScreen = useMediaQuery('(max-width: 380px)');
  if (isVerySmallScreen) {
    return null;
  }

  const clicksReportPath = `../../../../links/${link.id}`;

  const button = isMobile ? (
    <IconButton
      className="text-muted flex-shrink-0"
      elementType={Link}
      to={clicksReportPath}
      relative="path"
    >
      <BarChartIcon />
    </IconButton>
  ) : (
    <Button
      variant="text"
      className="text-muted"
      startIcon={<BarChartIcon />}
      elementType={Link}
      to={clicksReportPath}
      relative="path"
    >
      <Trans message=":count clicks" values={{count: link.clicks_count}} />
    </Button>
  );

  return (
    <Tooltip
      label={
        <Trans
          message=":count lifetime clicks"
          values={{count: link.clicks_count}}
        />
      }
    >
      {button}
    </Tooltip>
  );
}
