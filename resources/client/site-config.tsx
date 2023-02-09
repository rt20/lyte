import {SiteConfigContextValue} from '@common/core/settings/site-config-context';
import {message} from '@common/i18n/message';
import pageTop from './admin/verts/page-top.png';
import splashTop from './admin/verts/splash-top.png';
import splashBottom from './admin/verts/splash-bottom.png';
import dashboardTop from './admin/verts/dashboard-top.png';
import frameTop from './admin/verts/frame-top.png';
import landingTop from './admin/verts/landing-top.png';
import biolinkTop from './admin/verts/biolink-top.png';

export const SiteConfig: Partial<SiteConfigContextValue> = {
  homepage: {
    options: [{label: message('Landing page'), value: 'landingPage'}],
  },
  settings: {
    showRecaptchaLinkSwitch: true,
  },
  auth: {
    redirectUri: '/dashboard',
    adminRedirectUri: '/admin',
  },
  tags: {
    types: [{name: 'label', system: true}],
  },
  customPages: {
    types: [{type: 'link_page', label: message('Link page')}],
  },
  admin: {
    ads: [
      {
        slot: 'ads.biolink_top',
        description: message(
          'This ad will appear at the top of biolink pages.'
        ),
        image: biolinkTop,
      },
      {
        slot: 'ads.splash_top',
        description: message(
          'This ad will appear at the top of link splash pages.'
        ),
        image: splashTop,
      },
      {
        slot: 'ads.splash_bottom',
        description: message(
          'This ad will appear at the bottom of link splash pages.'
        ),
        image: splashBottom,
      },
      {
        slot: 'ads.dashboard',
        description: message('This ad will appear on user dashboard page.'),
        image: dashboardTop,
      },
      {
        slot: 'ads.frame',
        description: message('This ad will appear on link frame page.'),
        image: frameTop,
      },
      {
        slot: 'ads.landing',
        description: message('This ad will appear at the top of landing page.'),
        image: landingTop,
      },
      {
        slot: 'ads.link_page',
        description: message('This ad will appear on custom link pages.'),
        image: pageTop,
      },
    ],
  },
};
