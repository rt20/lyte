import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {ShareIcon} from '@common/icons/material/Share';
import {Item} from '@common/ui/forms/listbox/item';
import {Trans} from '@common/i18n/trans';
import {Link} from '@app/dashboard/links/link';
import {CopyLinkIcon} from '@app/dashboard/links/sharing/copy-link-icon';
import {QrCode2Icon} from '@common/icons/material/QrCode2';
import {FacebookIcon} from '@common/icons/social/facebook';
import {TwitterIcon} from '@common/icons/social/twitter';
import {useSettings} from '@common/core/settings/use-settings';
import useClipboard from 'react-use-clipboard';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {shareLinkSocially} from '@common/utils/urls/share-link-socially';
import {useTrans} from '@common/i18n/use-trans';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {Button} from '@common/ui/buttons/button';
import {IconButton} from '@common/ui/buttons/icon-button';

interface ShareLinkButtonProps {
  link: Link | LinkGroup | Biolink;
  variant?: 'icon' | 'text';
  className?: string;
}
export function ShareLinkButton({
  link,
  className,
  variant = 'icon',
}: ShareLinkButtonProps) {
  const {base_url} = useSettings();
  const {trans} = useTrans();

  let url: string;
  if ('short_url' in link && link.short_url) {
    url = link.short_url;
  } else {
    url = `${base_url}/${link.hash}`;
  }
  const [, setUrlCopied] = useClipboard(url);
  const [, setQrCopied] = useClipboard(`${url}/qr`);

  const trigger =
    variant === 'text' ? (
      <Button className={className} startIcon={<ShareIcon />} variant="text">
        <Trans message="Share" />
      </Button>
    ) : (
      <IconButton className={className}>
        <ShareIcon />
      </IconButton>
    );

  return (
    <MenuTrigger>
      <Tooltip label={<Trans message="Share" />}>{trigger}</Tooltip>
      <Menu>
        <Item
          value="clipboard"
          startIcon={<CopyLinkIcon />}
          onSelected={() => {
            setUrlCopied();
            toast.positive(message('Copied link to clipboard'));
          }}
        >
          <Trans message="Copy to clipboard" />
        </Item>
        <Item
          value="qr"
          startIcon={<QrCode2Icon />}
          onClick={() => {
            setQrCopied();
            toast.positive(message('Copied QR code link to clipboard'));
          }}
        >
          <Trans message="Copy QR code" />
        </Item>
        <Item
          value="facebook"
          startIcon={<FacebookIcon />}
          onClick={() => {
            shareLinkSocially(
              'facebook',
              url,
              trans(message('Check out this link'))
            );
          }}
        >
          <Trans message="Share to facebook" />
        </Item>
        <Item
          value="twitter"
          startIcon={<TwitterIcon />}
          onClick={() => {
            shareLinkSocially(
              'twitter',
              url,
              trans(message('Check out this link'))
            );
          }}
        >
          <Trans message="Share to twitter" />
        </Item>
      </Menu>
    </MenuTrigger>
  );
}
