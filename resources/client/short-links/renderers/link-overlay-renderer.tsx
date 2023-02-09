import {Link} from '@app/dashboard/links/link';
import {AdHost} from '@common/admin/ads/ad-host';
import {FloatingLinkOverlay} from '@app/short-links/floating-link-overlay';

interface LinkPageRendererProps {
  link: Link;
}
export function LinkOverlayRenderer({link}: LinkPageRendererProps) {
  return (
    <div className="flex flex-col h-full relative">
      <AdHost slot="frame" className="my-20" />
      {link.overlay && <FloatingLinkOverlay overlay={link.overlay} />}
      <iframe src={link.long_url} className="h-full w-full flex-auto" />
    </div>
  );
}
