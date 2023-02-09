import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';
import clsx from 'clsx';
import {Button} from '@common/ui/buttons/button';
import {CrupdateLinkOverlayPayload} from '@app/dashboard/link-overlays/crupdate/crupdate-link-overlay-payload';

type Overlay = LinkOverlay | CrupdateLinkOverlayPayload;

interface LinkOverlayProps {
  overlay: Overlay;
}
export function FloatingLinkOverlay({overlay}: LinkOverlayProps) {
  const colors = overlay.colors || {};
  return (
    <div
      style={{
        backgroundColor: colors['bg-color'],
        backgroundImage: colors['bg-image'] ? `url(${colors['bg-image']})` : '',
        color: colors['text-color'],
      }}
      className={clsx(
        'absolute max-w-[calc(100%-14px)] p-16 overflow-hidden shadow-lg bg-cover bg text-main',
        getOverlayPositionClass(overlay),
        getOverlayThemeClass(overlay.theme)
      )}
    >
      {overlay.label && (
        <div
          className={clsx(
            'absolute w-84 h-[88px]',
            overlay.theme === 'pill' ? 'top-4 right-4' : '-top-4 -right-4'
          )}
        >
          <div
            className="relative -left-4 top-14 w-[120px] rotate-45 text-sm py-4 text-center shadow"
            style={{
              background: colors['label-bg-color'],
              color: colors['label-color'],
            }}
          >
            {overlay.label}
          </div>
        </div>
      )}
      {overlay.message && (
        <div
          className={clsx(
            'text-sm',
            overlay.theme === 'full-width' ? 'mb-14' : 'my-14'
          )}
        >
          {overlay.message}
        </div>
      )}
      {overlay.btn_text && (
        <Button
          size="sm"
          style={{
            borderColor: colors['btn-bg-color'],
            background: colors['btn-bg-color'],
            color: colors['btn-text-color'],
          }}
          variant="flat"
          color="primary"
          elementType="a"
          href={overlay.btn_link}
          tabIndex={0}
        >
          {overlay.btn_text}
        </Button>
      )}
    </div>
  );
}

function getOverlayPositionClass(overlay: Overlay) {
  // full width overlay can only be top or bottom
  if (overlay.theme === 'full-width') {
    return overlay.position.startsWith('top')
      ? 'top-14 left-14'
      : 'bottom-14 left-14';
  }

  switch (overlay.position) {
    case 'top-left':
      return 'top-14 left-14';
    case 'top-right':
      return 'top-14 right-14';
    case 'bottom-left':
      return 'bottom-14 left-14';
    case 'bottom-right':
      return 'bottom-14 right-14';
  }
}

function getOverlayThemeClass(theme: LinkOverlay['theme']) {
  const defaultWidth = 'w-350';
  switch (theme) {
    case 'default':
      return `rounded p-16 ${defaultWidth}`;
    case 'rounded':
      return `rounded-lg p-16 ${defaultWidth}`;
    case 'pill':
      return `rounded-full px-30 pb-24 pt-14 ${defaultWidth}`;
    case 'full-width':
      return 'rounded w-full flex items-center justify-center flex-col';
  }
}
