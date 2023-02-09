import {Button} from '@common/ui/buttons/button';
import type {
  Biolink,
  BiolinkAppearance,
  BiolinkBtnConfig,
  BiolinkLink,
} from '@app/dashboard/biolink/biolink';
import {ReactElement, useEffect} from 'react';
import clsx from 'clsx';
import {loadFonts} from '@common/ui/font-picker/load-fonts';
import {cssPropsFromBgConfig} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/css-props-from-bg-config';
import {WidgetRenderers} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-renderers';
import {AdHost} from '@common/admin/ads/ad-host';

interface BiolinkLayoutProps {
  biolink: Biolink;
  appearance?: BiolinkAppearance | null;
  className?: string;
  enableLinkAnimations?: boolean;
  showAds?: boolean;
}
export function BiolinkLayout({
  biolink,
  className,
  appearance,
  enableLinkAnimations,
  showAds,
}: BiolinkLayoutProps) {
  appearance = appearance || biolink.appearance?.config;

  useEffect(() => {
    const id = 'biolink-fonts';
    if (appearance?.fontConfig) {
      loadFonts([appearance?.fontConfig], {id});
    }
  }, [appearance?.fontConfig]);

  useEffect(() => {
    const hasAnimations = biolink.content.some(
      item => item.model_type === 'link' && item.animation
    );
    if (enableLinkAnimations && hasAnimations) {
      import(
        '@app/dashboard/biolink/biolink-editor/content/link-content-item/animate.min.css'
      );
    }
  }, [enableLinkAnimations, biolink.content]);

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        ...cssPropsFromBgConfig(appearance?.bgConfig),
        fontFamily: appearance?.fontConfig?.family,
      }}
    >
      <div className={clsx('px-12 py-34 w-full h-full', className)}>
        {showAds && <AdHost slot="biolink_top" className="mb-60" />}
        {biolink.content.map(item => {
          if (!item.active) {
            return null;
          }

          const key = `${item.model_type}-${item.id}`;
          let renderedItem: ReactElement;
          if (item.model_type === 'link') {
            renderedItem = <LinkButton appearance={appearance} link={item} />;
          } else {
            const Widget = WidgetRenderers[item.type];
            renderedItem = <Widget widget={item} variant="biolinkPage" />;
          }

          return (
            <div className="mb-14 w-full" key={key}>
              {renderedItem}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface LinkButtonProps {
  link: BiolinkLink;
  appearance?: BiolinkAppearance | null;
}
function LinkButton({link, appearance}: LinkButtonProps) {
  const variant: BiolinkBtnConfig['variant'] =
    appearance?.btnConfig?.variant ?? 'flat';
  const radius: BiolinkBtnConfig['radius'] =
    appearance?.btnConfig?.radius ?? 'rounded';
  const shadow: BiolinkBtnConfig['shadow'] =
    appearance?.btnConfig?.shadow ?? undefined;
  const buttonColor: BiolinkBtnConfig['color'] =
    appearance?.btnConfig?.color ?? 'primary';
  const buttonTextColor = appearance?.btnConfig?.textColor ?? undefined;

  const isCustomBgColor = buttonColor !== 'primary' && buttonColor !== 'paper';

  return (
    <Button
      className={clsx(
        'w-full min-h-54 break-words hyphens-auto',
        link.animation && `animate__animated animate__${link.animation}`
      )}
      variant={variant}
      radius={radius}
      color={!isCustomBgColor ? buttonColor : null}
      startIcon={
        link.image ? (
          <img
            className="w-24 h-24 object-cover rounded"
            src={link.image}
            alt=""
          />
        ) : undefined
      }
      whitespace="whitespace-normal"
      elementType="a"
      href={link.short_url}
      target="_blank"
      style={{
        boxShadow: shadow,
        backgroundColor: isCustomBgColor ? buttonColor : undefined,
        borderColor: isCustomBgColor ? buttonColor : undefined,
        color: buttonTextColor,
      }}
    >
      {link.name}
    </Button>
  );
}
