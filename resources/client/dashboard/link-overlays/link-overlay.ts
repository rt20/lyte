import {User} from '@common/auth/user';

export interface LinkOverlay {
  id: number;
  name: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  theme: 'default' | 'full-width' | 'rounded' | 'pill';
  message: string;
  label: string;
  btn_text: string;
  btn_link: string;
  user_id: number;
  user?: User;
  colors: {
    'bg-image'?: string;
    'bg-color'?: string;
    'text-color'?: string;
    'btn-bg-color'?: string;
    'btn-text-color'?: string;
    'label-bg-color'?: string;
    'label-color'?: string;
  };
  created_at: string;
  updated_at: string;
  model_type: 'linkOverlay';
}
