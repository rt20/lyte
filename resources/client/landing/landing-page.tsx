import clsx from 'clsx';
import {LandingPageContent} from './landing-page-content';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {Button, ButtonProps} from '@common/ui/buttons/button';
import {MixedImage} from '@common/ui/images/mixed-image';
import {Footer} from '@common/ui/footer/footer';
import {Trans} from '@common/i18n/trans';
import {AdHost} from '@common/admin/ads/ad-host';
import {Link} from 'react-router-dom';
import {createSvgIconFromTree} from '@common/icons/create-svg-icon';
import {MenuItemConfig} from '@common/core/settings/settings';
import {Fragment, useState} from 'react';
import {DefaultMetaTags} from '@common/seo/default-meta-tags';
import {useSettings} from '@common/core/settings/use-settings';
import {LandingPageNewLinkForm} from '@app/landing/landing-page-new-link-form';
import {useAuth} from '@common/auth/use-auth';
import {LandingPageStats} from '@app/landing/landing-page-stats';
import {PricingTable} from '@common/billing/pricing-table/pricing-table';
import {BillingCycleRadio} from '@common/billing/pricing-table/billing-cycle-radio';
import {UpsellBillingCycle} from '@common/billing/pricing-table/find-best-price';
import {useProducts} from '@common/billing/pricing-table/use-products';

interface ContentProps {
  content: LandingPageContent;
}
export function LandingPage() {
  const settings = useSettings();
  const homepage = settings.homepage as {appearance: LandingPageContent};

  const showPricing =
    settings.links.homepage_pricing && settings.billing.enable;

  return (
    <Fragment>
      <DefaultMetaTags />
      <div className="h-full overflow-y-auto scroll-smooth">
        <HeroHeader content={homepage.appearance} />
        <AdHost slot="landing" className="mb-14 md:mb-70 -mt-30 mx-14" />
        <PrimaryFeatures content={homepage.appearance} />
        <div className="h-1 bg-divider mt-100" />
        <SecondaryFeatures content={homepage.appearance} />
        {settings.links?.homepage_stats && <LandingPageStats />}
        <BottomCta content={homepage.appearance} />
        {showPricing && <PricingSection content={homepage.appearance} />}
        <Footer className="landing-container" />
      </div>
    </Fragment>
  );
}

function HeroHeader({content}: ContentProps) {
  const {hasPermission} = useAuth();
  const {
    links: {homepage_creation},
  } = useSettings();

  const {
    headerTitle,
    headerSubtitle,
    headerImage,
    headerImageOpacity,
    actions,
    headerOverlayColor1,
    headerOverlayColor2,
  } = content;
  let overlayBackground = undefined;

  if (headerOverlayColor1 && headerOverlayColor2) {
    overlayBackground = `linear-gradient(45deg, ${headerOverlayColor1} 0%, ${headerOverlayColor2} 100%)`;
  } else if (headerOverlayColor1) {
    overlayBackground = headerOverlayColor1;
  } else if (headerOverlayColor2) {
    overlayBackground = headerOverlayColor2;
  }

  return (
    <header className="relative mb-14 md:mb-60 overflow-hidden isolate">
      <img
        data-testid="headerImage"
        src={headerImage}
        style={{
          opacity: headerImageOpacity,
        }}
        alt=""
        width="2347"
        height="1244"
        decoding="async"
        loading="lazy"
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 z-20"
      />
      <div
        className="absolute w-full h-full z-10 bg-[rgb(37,99,235)]"
        style={{background: overlayBackground}}
      />
      <div className="flex flex-col relative h-full z-30">
        <Navbar
          color="transparent"
          className="flex-shrink-0"
          menuPosition="homepage-navbar"
          primaryButtonColor="paper"
        />
        <div className="flex-auto flex flex-col items-center justify-center text-white max-w-850 mx-auto text-center px-14 py-50 lg:py-90">
          {headerTitle && (
            <h1
              className="text-3xl md:text-5xl font-normal"
              data-testid="headerTitle"
            >
              <Trans message={headerTitle} />
            </h1>
          )}
          {headerSubtitle && (
            <div
              className="max-auto max-w-640 text-lg tracking-tight md:text-xl mt-24"
              data-testid="headerSubtitle"
            >
              <Trans message={headerSubtitle} />
            </div>
          )}
          {homepage_creation && hasPermission('links.create') && (
            <LandingPageNewLinkForm content={content} />
          )}
          <div className="flex gap-20 pt-70 md:pt-90 pb-30 md:pb-50 min-h-50 empty:min-h-0">
            <CtaButton
              item={actions.cta1}
              variant="raised"
              color="primary"
              size="lg"
              radius="rounded-full"
              data-testid="cta1"
              className="min-w-180"
            />
            <CtaButton
              item={actions.cta2}
              variant="text"
              color="paper"
              size="lg"
              radius="rounded-full"
              data-testid="cta2"
            />
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-0 transform translate-y-1/2 -skew-y-3 h-[6vw] z-20 bg"></div>
    </header>
  );
}

interface CtaButtonProps extends ButtonProps {
  item?: MenuItemConfig;
}
function CtaButton({item, ...buttonProps}: CtaButtonProps) {
  if (!item?.label || !item?.action) return null;
  const Icon = item.icon ? createSvgIconFromTree(item.icon) : undefined;
  return (
    <Button
      elementType={item.type === 'route' ? Link : 'a'}
      href={item.action}
      to={item.action}
      startIcon={Icon ? <Icon /> : undefined}
      {...buttonProps}
    >
      <Trans message={item.label} />
    </Button>
  );
}

function PrimaryFeatures({content}: ContentProps) {
  return (
    <div
      className="md:flex items-stretch gap-26 landing-container z-20"
      id="primary-features"
    >
      {content.primaryFeatures.map((feature, index) => (
        <div
          key={index}
          className="flex-1 px-24 py-36 rounded-2xl mb-14 md:mb-0 shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-center dark:bg-alt"
          data-testid={`primary-root-${index}`}
        >
          <MixedImage
            className="h-128 mx-auto mb-30"
            data-testid={`primary-image-${index}`}
            src={feature.image}
          />
          <h2
            className="my-16 text-lg font-medium"
            data-testid={`primary-title-${index}`}
          >
            <Trans message={feature.title} />
          </h2>
          <div
            className="text-md text-[0.938rem]"
            data-testid={`primary-subtitle-${index}`}
          >
            <Trans message={feature.subtitle} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SecondaryFeatures({content}: ContentProps) {
  return (
    <div className="relative overflow-hidden pt-100">
      <div className="landing-container relative" id="features">
        {content.secondaryFeatures.map((feature, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              data-testid={`secondary-root-${index}`}
              className={clsx(
                'md:flex py-16 mb-14 md:mb-80 z-20 relative',
                isEven && 'flex-row-reverse'
              )}
            >
              <img
                src={feature.image}
                className="rounded-lg max-w-full mr-auto shadow-[0_10px_30px_rgba(0,0,0,0.08)] w-580"
                data-testid={`secondary-image-${index}`}
                alt=""
              />
              <div className="ml-30 mr-auto max-w-350 pt-30">
                <small
                  className="uppercase mb-16 tracking-widest font-medium text-xs text-muted"
                  data-testid={`secondary-subtitle-${index}`}
                >
                  <Trans message={feature.subtitle} />
                </small>
                <h3
                  className="py-16 text-3xl"
                  data-testid={`secondary-title-${index}`}
                >
                  <Trans message={feature.title} />
                </h3>
                <div className="w-50 h-2 bg-black/90 dark:bg-divider" />
                <div
                  className="my-20 text-[0.938rem]"
                  data-testid={`secondary-description-${index}`}
                >
                  <Trans message={feature.description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface PricingSectionProps {
  content: LandingPageContent;
}
function PricingSection({content}: PricingSectionProps) {
  const query = useProducts();
  const [selectedCycle, setSelectedCycle] =
    useState<UpsellBillingCycle>('yearly');

  return (
    <div className="py-80 sm:py-128" id="pricing">
      <div className="mx-auto max-w-1280 px-24 lg:px-32">
        <div className="md:text-center">
          <h2
            className="font-display text-3xl tracking-tight sm:text-4xl"
            data-testid="pricingTitle"
          >
            <Trans message={content.pricingTitle} />
          </h2>
          <p className="mt-16 text-lg text-muted" data-testid="pricingSubtitle">
            <Trans message={content.pricingSubtitle} />
          </p>
        </div>
        <BillingCycleRadio
          products={query.data?.products}
          selectedCycle={selectedCycle}
          onChange={setSelectedCycle}
          className="my-50 flex justify-center"
          size="lg"
        />
        <PricingTable selectedCycle={selectedCycle} />
      </div>
    </div>
  );
}

function BottomCta({content}: ContentProps) {
  return (
    <div
      className="relative py-90 md:py-128 overflow-hidden text-white bg-[rgb(37,99,235)]"
      data-testid="footerImage"
    >
      <img
        src={content.footerImage}
        alt=""
        width="2347"
        height="1244"
        decoding="async"
        loading="lazy"
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
      />
      <div className="relative mx-auto max-w-1280 px-24 sm:px-16 lg:px-32 text-center">
        <div className="mx-auto max-w-512 text-center">
          <h2
            className=" font-display text-3xl tracking-tight sm:text-4xl"
            data-testid="footerTitle"
          >
            <Trans message={content.footerTitle} />
          </h2>
          {content.footerSubtitle && (
            <p
              className="mt-16 text-lg tracking-tight"
              data-testid="footerSubtitle"
            >
              <Trans message={content.footerSubtitle} />
            </p>
          )}
          <CtaButton
            item={content.actions.cta3}
            size="lg"
            radius="rounded-full"
            variant="outline"
            color="paper"
            className="block mt-40"
            data-testid="cta3"
          />
        </div>
      </div>
    </div>
  );
}
