import {useBootstrapData} from '@common/core/bootstrap-data/bootstrap-data-context';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import {Helmet} from '@common/seo/helmet';
import {Link} from '@app/dashboard/links/link';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {LinkPageRenderer} from '@app/short-links/renderers/link-page-renderer';
import {Fragment, useState} from 'react';
import {LinkOverlayRenderer} from '@app/short-links/renderers/link-overlay-renderer';
import {LinkIframeRenderer} from '@app/short-links/renderers/link-iframe-renderer';
import {LinkSplashRenderer} from '@app/short-links/renderers/link-splash-renderer';
import {LinkGroupRenderer} from '@app/short-links/renderers/link-group-renderer';
import {BiolinkRenderer} from '@app/short-links/renderers/biolink-renderer/biolink-renderer';
import {PasswordPage} from '@app/short-links/password-page';

type Linkeable = Link | LinkGroup | Biolink;

export function ShortLinkRenderer() {
  const {
    data: {linkeableResponse},
  } = useBootstrapData();

  if (!linkeableResponse?.linkeable) {
    return <NotFoundPage />;
  }

  return (
    <Fragment>
      <Helmet tags={linkeableResponse.seo} />
      <LinkeableRenderer linkeable={linkeableResponse.linkeable} />
    </Fragment>
  );
}

interface LinkPageRendererProps {
  linkeable: Linkeable;
}
function LinkeableRenderer({linkeable}: LinkPageRendererProps) {
  const [passwordValid, setPasswordValid] = useState(!linkeable.has_password);
  if (linkeable.has_password && !passwordValid) {
    return (
      <PasswordPage
        linkeable={linkeable}
        onPasswordValid={() => {
          setPasswordValid(true);
        }}
      />
    );
  }

  return getLinkeableRenderer(linkeable);
}

function getLinkeableRenderer(linkeable: Linkeable) {
  switch (linkeable.model_type) {
    case 'link':
      return getLinkRenderer(linkeable as Link);
    case 'linkGroup':
      return <LinkGroupRenderer linkGroup={linkeable} />;
    case 'biolink':
      return <BiolinkRenderer biolink={linkeable} />;
    default:
      return <NotFoundPage />;
  }
}

function getLinkRenderer(link: Link) {
  switch (link.type) {
    case 'frame':
      return <LinkIframeRenderer link={link} />;
    case 'overlay':
      return <LinkOverlayRenderer link={link} />;
    case 'splash':
      return <LinkSplashRenderer link={link} />;
    case 'page':
      return <LinkPageRenderer link={link} />;
    case 'direct':
      window.location.replace(link.long_url);
      return null;
    default:
      return <NotFoundPage />;
  }
}
