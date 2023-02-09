import {Link} from '@app/dashboard/links/link';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {CustomPageBody} from '@common/custom-page/custom-page-body';
import {Footer} from '@common/ui/footer/footer';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';
import {AdHost} from '@common/admin/ads/ad-host';
import {RedirectCountdownButton} from '@app/short-links/renderers/redirect-countdown-button';

interface LinkPageRendererProps {
  link: Link;
}
export function LinkPageRenderer({link}: LinkPageRendererProps) {
  const page = link.custom_page!;
  const {hideNavbar, hideFooter} = page.meta ?? {};
  return (
    <div className="flex flex-col min-h-full">
      {!hideNavbar && <LinkPageNavbar link={link} />}
      <AdHost slot="link_page" className="mt-70 mb-20pa" />
      <div className="flex-auto">
        <CustomPageBody page={page} />
      </div>
      {!hideFooter && <Footer className="mx-14 md:mx-40" />}
    </div>
  );
}

interface LinkPageNavbarProps {
  link: Link;
}
function LinkPageNavbar({link}: LinkPageNavbarProps) {
  return (
    <Navbar
      menuPosition="link-page-navbar"
      className="flex-shrink-0 sticky top-0"
      rightChildren={<ShareLinkButton link={link} />}
    >
      <RedirectCountdownButton variant="flat" color="paper" link={link} />
    </Navbar>
  );
}
