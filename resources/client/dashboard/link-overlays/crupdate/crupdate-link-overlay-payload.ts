import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';

export interface CrupdateLinkOverlayPayload {
  name: string;
  position: LinkOverlay['position'];
  theme: LinkOverlay['theme'];
  message?: string;
  label?: string;
  btn_link?: string;
  btn_text?: string;
  colors: LinkOverlay['colors'];
}
