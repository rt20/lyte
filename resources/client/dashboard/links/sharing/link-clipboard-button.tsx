import {Link} from '../link';
import {LinkGroup} from '../../link-groups/link-group';
import {useSettings} from '@common/core/settings/use-settings';
import useClipboard from 'react-use-clipboard';
import {IconButton} from '@common/ui/buttons/icon-button';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {CopyLinkIcon} from './copy-link-icon';
import {Button} from '@common/ui/buttons/button';
import {removeProtocol} from '@common/utils/urls/remove-protocol';
import {ComponentProps} from 'react';
import {ButtonBase} from '@common/ui/buttons/button-base';

interface LinkClipboardButtonProps
  extends Omit<ComponentProps<typeof Button>, 'variant'> {
  link: Link | LinkGroup;
  variant: 'icon' | 'text';
}
export function LinkClipboardButton({
  link,
  variant,
  ...domProps
}: LinkClipboardButtonProps) {
  const {base_url} = useSettings();
  let url: string;
  if ('short_url' in link && link.short_url) {
    url = link.short_url;
  } else {
    url = `${base_url}/${link.hash}`;
  }
  const [, setCopied] = useClipboard(url);

  if (variant === 'text') {
    return (
      <ButtonBase
        {...domProps}
        onClick={() => {
          setCopied();
          toast.positive(message('Copied to clipboard'));
        }}
      >
        {removeProtocol(url)}
      </ButtonBase>
    );
  }

  return (
    <Tooltip label={<Trans message="Copy to clipboard" />}>
      <IconButton
        {...domProps}
        onClick={() => {
          setCopied();
          toast.positive(message('Copied to clipboard'));
        }}
      >
        <CopyLinkIcon />
      </IconButton>
    </Tooltip>
  );
}
