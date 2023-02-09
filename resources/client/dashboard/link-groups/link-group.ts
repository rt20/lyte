import {User} from '@common/auth/user';
import {LinkRule} from '@app/dashboard/links/link-rule';
import {CustomDomain} from '@common/custom-domains/custom-domain';
import {TrackingPixel} from '@app/dashboard/tracking-pixels/tracking-pixel';
import {Tag} from '@common/tags/tag';

export interface LinkGroup {
  id: number;
  name: string;
  description: string;
  image?: string | null;
  pixels?: TrackingPixel[];
  tags?: Tag[];
  hash: string;
  active: boolean;
  rotator: boolean;
  user_id: number;
  user?: User;
  utm?: string;
  activates_at?: string;
  expires_at?: string;
  clicks_count?: number;
  rules: LinkRule[];
  domain_id?: number;
  domain?: CustomDomain;
  has_password?: boolean;
  short_url: string;
  links_count?: number;
  created_at: string;
  updated_at: string;
  model_type: 'linkGroup';
}
