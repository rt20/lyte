import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {message} from '@common/i18n/message';
import {EmailIcon} from '@common/icons/material/Email';
import {JSXElementConstructor} from 'react';
import {SvgIconProps} from '@common/icons/svg-icon';
import {FacebookIcon} from '@common/icons/social/facebook';
import {TwitterIcon} from '@common/icons/social/twitter';
import {InstagramIcon} from '@common/icons/social/instagram';
import {TiktokIcon} from '@common/icons/social/tiktok';
import {YoutubeIcon} from '@common/icons/social/youtube';
import {SoundcloudIcon} from '@common/icons/social/soundcloud';
import {BandcampIcon} from '@common/icons/social/bandcamp';
import {LinkedinIcon} from '@common/icons/social/linkedin';
import {WhatsappIcon} from '@common/icons/social/whatsapp';
import {TelegramIcon} from '@common/icons/social/telegram';
import {TwitchIcon} from '@common/icons/social/twitch';
import {PatreonIcon} from '@common/icons/social/patreon';
import {PinterestIcon} from '@common/icons/social/pinterest';
import {SpotifyIcon} from '@common/icons/social/spotify';
import {AmazonIcon} from '@common/icons/social/amazon';
import {SnapchatIcon} from '@common/icons/social/snapchat';
import {AppleIcon} from '@common/icons/social/apple';

export interface SocialsListItem {
  name: MessageDescriptor;
  placeholder: string;
  icon: JSXElementConstructor<SvgIconProps>;
  inputType?: string;
  pattern?: string;
}

export enum SocialsType {
  Mail = 'mail',
  Facebook = 'facebook',
  Twitter = 'twitter',
  Instagram = 'instagram',
  Tiktok = 'tiktok',
  Youtube = 'youtube',
  Soundcloud = 'soundcloud',
  Bandcamp = 'bandcamp',
  LinkedIn = 'linkedin',
  Whatsapp = 'whatsapp',
  Telegram = 'telegram',
  Twitch = 'twitch',
  Patreon = 'patreon',
  Pinterest = 'pinterest',
  Spotify = 'spotify',
  Amazon = 'amazon',
  Snapchat = 'snapchat',
  Apple = 'apple',
}

export const SocialsList: Record<SocialsType, SocialsListItem> = {
  [SocialsType.Mail]: {
    name: message('Email'),
    placeholder: 'your@email.com',
    inputType: 'email',
    icon: EmailIcon,
  },
  [SocialsType.Facebook]: {
    name: message('Facebook url'),
    placeholder: 'https://facebook.com/username',
    pattern: 'https://(www.)?facebook.com/[a-zA-Z0-9._%-]+$',
    inputType: 'url',
    icon: FacebookIcon,
  },
  [SocialsType.Twitter]: {
    name: message('Twitter handle'),
    placeholder: '@yourtwitterhandle',
    pattern: '^@[A-Za-z0-9_]{1,15}$',
    icon: TwitterIcon,
  },
  [SocialsType.Instagram]: {
    name: message('Instagram username'),
    placeholder: '@instagramusername',
    pattern: '^@[a-zA-Z0-9._%-]+$',
    icon: InstagramIcon,
  },
  [SocialsType.Tiktok]: {
    name: message('TikTok username'),
    placeholder: '@tiktokusername',
    pattern: '^@[a-zA-Z0-9._%-]+$',
    icon: TiktokIcon,
  },
  [SocialsType.Youtube]: {
    name: message('Youtube channel url'),
    placeholder: 'https://youtube.com/channel/youtubechannelurl',
    inputType: 'url',
    pattern: 'https://(www.)?youtube.com/channel/[a-zA-Z0-9._%-]+$',
    icon: YoutubeIcon,
  },
  [SocialsType.Soundcloud]: {
    name: message('SoundCloud url'),
    placeholder: 'https://soundcloud.com/username',
    inputType: 'url',
    pattern: 'https://(www.)?soundcloud.com/[a-zA-Z0-9._%-]+$',
    icon: SoundcloudIcon,
  },
  [SocialsType.Bandcamp]: {
    name: message('Bandcamp url'),
    placeholder: 'https://you.bandcamp.com',
    inputType: 'url',
    pattern: 'https://(www.)?[a-zA-Z0-9._%-]+.bandcamp.com$',
    icon: BandcampIcon,
  },
  [SocialsType.LinkedIn]: {
    name: message('LinkedIn url'),
    placeholder: 'https://linkedin.com/in/username',
    inputType: 'url',
    pattern: 'https://(www.)?linkedin.com/in/[a-zA-Z0-9._%-]+$',
    icon: LinkedinIcon,
  },
  [SocialsType.Whatsapp]: {
    name: message('WhatsApp'),
    placeholder: '+00000000000',
    pattern: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$',
    icon: WhatsappIcon,
  },
  [SocialsType.Telegram]: {
    name: message('Telegram url'),
    placeholder: 'https://t.me',
    inputType: 'url',
    pattern: 'https://(www.)?t.me/[a-zA-Z0-9._%-]+$',
    icon: TelegramIcon,
  },
  [SocialsType.Twitch]: {
    name: message('Twitch url'),
    placeholder: 'https://twitch.tv/username',
    inputType: 'url',
    pattern: 'https://(www.)?twitch.tv/[a-zA-Z0-9._%-]+$',
    icon: TwitchIcon,
  },
  [SocialsType.Patreon]: {
    name: message('Patreon url'),
    placeholder: 'https://patreon.com/username',
    inputType: 'url',
    pattern: 'https://(www.)?patreon.com/[a-zA-Z0-9._%-]+$',
    icon: PatreonIcon,
  },
  [SocialsType.Pinterest]: {
    name: message('Pinterest url'),
    placeholder: 'https://pinterest.com',
    inputType: 'url',
    pattern: 'https://(www.)?pinterest.com/.+',
    icon: PinterestIcon,
  },
  [SocialsType.Spotify]: {
    name: message('Spotify artist url'),
    placeholder: 'https://open.spotify.com/artist/artistname',
    inputType: 'url',
    pattern: 'https://(www.)?open.spotify.com/artist/[a-zA-Z0-9._%-]+$',
    icon: SpotifyIcon,
  },
  [SocialsType.Amazon]: {
    name: message('Amazon shop url'),
    placeholder: 'https://amazon.com/shop/yourshopname',
    inputType: 'url',
    pattern: 'https://(www.)?amazon.com/shop/[a-zA-Z0-9._%-]+$',
    icon: AmazonIcon,
  },
  [SocialsType.Snapchat]: {
    name: message('Snapchat url'),
    placeholder: 'https://www.snapchat.com/add/yourusername',
    inputType: 'url',
    pattern: 'https://(www.)?snapchat.com/add/[a-zA-Z0-9_--%]+$',
    icon: SnapchatIcon,
  },
  [SocialsType.Apple]: {
    name: message('Apple music url'),
    placeholder: 'https://music.apple.com/us/album/youralbum',
    inputType: 'url',
    pattern: 'https://(www.)?music.apple.com/.+',
    icon: AppleIcon,
  },
};
