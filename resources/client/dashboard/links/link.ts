import {CustomPage} from '@common/admin/custom-pages/custom-page';
import {Tag} from '@common/tags/tag';
import {User} from '@common/auth/user';
import {LinkRule} from './link-rule';
import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';
import {TrackingPixel} from '@app/dashboard/tracking-pixels/tracking-pixel';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Biolink} from '@app/dashboard/biolink/biolink';

export type LinkType = 'direct' | 'frame' | 'splash' | 'overlay' | 'page';

export interface Link {
  id: number;
  hash: string;
  name: string;
  image: string | null;
  alias: string | null;
  description: string;
  expires_at: string;
  activates_at: string;
  clicked_at: string;
  password?: string;
  utm?: string;
  has_password: boolean;
  active: boolean;
  domain_id: number;
  short_url: string;
  long_url: string;
  type: LinkType;
  type_id: number | null;
  overlay?: LinkOverlay;
  custom_page?: CustomPage;
  user_id: number;
  created_at: string;
  updated_at: string;
  rules: LinkRule[];
  tags?: Tag[];
  groups?: (LinkGroup | Biolink)[];
  pixels?: TrackingPixel[];
  clicks_count?: number;
  user?: User;
  deleted_at?: string;
  model_type: 'link';
  animation?: string;
}
