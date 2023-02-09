import {Link} from '@app/dashboard/links/link';
import {AdHost} from '@common/admin/ads/ad-host';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';
import {Navbar} from '@common/ui/navigation/navbar/navbar';

interface LinkPageRendererProps {
  link: Link;
}
export function LinkIframeRenderer({link}: LinkPageRendererProps) {
  return (
    <div className="flex flex-col h-full relative">
      <Navbar
        menuPosition="link-page-navbar"
        className="flex-shrink-0 sticky top-0"
        rightChildren={<ShareLinkButton link={link} />}
      />
      <AdHost slot="frame" className="my-20" />
      <iframe src={link.long_url} className="h-full w-full flex-auto" />
    </div>
  );
}
