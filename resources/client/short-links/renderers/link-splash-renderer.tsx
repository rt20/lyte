import {Trans} from '@common/i18n/trans';
import {Link} from '@app/dashboard/links/link';
import {useSettings} from '@common/core/settings/use-settings';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';
import {Footer} from '@common/ui/footer/footer';
import {RedirectCountdownButton} from '@app/short-links/renderers/redirect-countdown-button';
import {Button} from '@common/ui/buttons/button';
import {AdHost} from '@common/admin/ads/ad-host';
import {Link as RouterLink} from 'react-router-dom';

interface LinkPageRendererProps {
  link: Link;
}
export function LinkSplashRenderer({link}: LinkPageRendererProps) {
  const {base_url} = useSettings();
  return (
    <div className="flex flex-col w-full h-full bg-alt">
      <Navbar
        menuPosition="link-page-navbar"
        rightChildren={<ShareLinkButton link={link} />}
      />
      <div className="container flex-auto flex flex-col items-center justify-center mx-auto px-24">
        <AdHost slot="splash_top" className="mt-20 mb-60 flex-shrink-0" />
        <div className="border rounded md:flex gap-24 p-20 bg-paper flex-shrink-0">
          <img
            src={`${base_url}/${link.hash}/img`}
            alt=""
            className="flex-shrink-0 border w-320 h-240 rounded max-w-full object-contain"
          />
          <div>
            <h1 className="text-2xl mt-24 md:mt-0 mb-24">
              <Trans message="You are about to be redirected to another page." />
            </h1>
            <div>
              <RedirectCountdownButton
                variant="flat"
                color="primary"
                link={link}
              />
              <Button className="ml-10" elementType={RouterLink} to="/">
                <Trans message="Go back" />
              </Button>
            </div>
            <div className="text-sm text-muted border-t mt-24 pt-24">
              <Trans message="You are about to be redirected to another page. We are not responsible for the content of that page or the consequences it may have on you." />
            </div>
          </div>
        </div>
        <AdHost slot="splash_bottom" className="mt-60 mb-20 flex-shrink-0" />
      </div>
      <Footer className="px-24" />
    </div>
  );
}
