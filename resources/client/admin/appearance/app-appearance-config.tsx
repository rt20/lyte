import {
  IAppearanceConfig,
  MenuSectionConfig,
} from '@common/admin/appearance/types/appearance-editor-config';
import {LandingPageSectionPrimaryFeatures} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-primary-features';
import {LandingPageSectionActionButtons} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-action-buttons';
import {AppearanceEditorBreadcrumbItem} from '@common/admin/appearance/types/appearance-editor-section';
import {LandingPageSectionGeneral} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-general';
import {LandingPageSecondaryFeatures} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-secondary-features';
import {message} from '@common/i18n/message';

export const AppAppearanceConfig: IAppearanceConfig = {
  preview: {
    defaultRoute: 'dashboard',
    navigationRoutes: ['dashboard'],
  },
  sections: {
    'landing-page': {
      label: message('Landing Page'),
      position: 1,
      previewRoute: '/',
      routes: [
        {path: 'landing-page', element: <LandingPageSectionGeneral />},
        {
          path: 'landing-page/action-buttons',
          element: <LandingPageSectionActionButtons />,
        },
        {
          path: 'landing-page/primary-features',
          element: <LandingPageSectionPrimaryFeatures />,
        },
        {
          path: 'landing-page/secondary-features',
          element: <LandingPageSecondaryFeatures />,
        },
      ],
      buildBreadcrumb: pathname => {
        const parts = pathname.split('/').filter(p => !!p);
        const sectionName = parts.pop();
        // admin/appearance
        const breadcrumb: AppearanceEditorBreadcrumbItem[] = [
          {
            label: message('Landing page'),
            location: 'landing-page',
          },
        ];
        if (sectionName === 'action-buttons') {
          breadcrumb.push({
            label: message('Action buttons'),
            location: 'landing-page/action-buttons',
          });
        }

        if (sectionName === 'primary-features') {
          breadcrumb.push({
            label: message('Primary features'),
            location: 'landing-page/primary-features',
          });
        }

        if (sectionName === 'secondary-features') {
          breadcrumb.push({
            label: message('Secondary features'),
            location: 'landing-page/secondary-features',
          });
        }

        return breadcrumb;
      },
    },
    // missing label will get added by deepMerge from default config
    // @ts-ignore
    menus: {
      config: {
        positions: [
          'link-page-navbar',
          'dashboard-navbar',
          'dashboard-sidebar',
          'homepage-navbar',
          'footer',
          'footer-secondary',
        ],
        availableRoutes: [
          '/dashboard',
          '/dashboard/biolinks',
          '/dashboard/links',
          '/dashboard/link-groups',
          '/dashboard/custom-domains',
          '/dashboard/link-overlays',
          '/dashboard/link-pages',
          '/dashboard/tracking-pixels',
        ],
      } as MenuSectionConfig,
    },
  },
};
