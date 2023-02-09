import {Link} from './link';
import {LinkGroup} from '../link-groups/link-group';
import {useSettings} from '@common/core/settings/use-settings';
import useClipboard from 'react-use-clipboard';

export function useCopyLink(link: Link | LinkGroup) {
  const {base_url} = useSettings();
  let url: string;
  if ('short_url' in link && link.short_url) {
    url = link.short_url;
  } else {
    url = `${base_url}/${link.hash}`;
  }
  return useClipboard(url);
}
