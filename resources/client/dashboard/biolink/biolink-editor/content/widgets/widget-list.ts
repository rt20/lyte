import {ImageWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/image-widget/image-widget-dialog';
import {JSXElementConstructor} from 'react';
import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {message} from '@common/i18n/message';
import imageThumbnail from './widget-selector/widget-images/image.png';
import textImage from './widget-selector/widget-images/text.png';
import socialsImage from './widget-selector/widget-images/socials.png';
import youtubeImage from './widget-selector/widget-images/youtube.png';
import soundcloudImage from './widget-selector/widget-images/soundcloud.png';
import vimeoImage from './widget-selector/widget-images/vimeo.jpeg';
import spotifyImage from './widget-selector/widget-images/spotify.png';
import twitchImage from './widget-selector/widget-images/twitch.svg';
import tiktokImage from './widget-selector/widget-images/tiktok.png';
import {WidgetDialogProps} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-dialog-props';
import {YoutubeWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/youtube-widget/youtube-widget-dialog';
import {TextWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/text-widget/text-widget-dialog';
import {SocialsWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/socials-widget/socials-widget-dialog';
import {TwitchWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/twitch-widget/twitch-widget-dialog';
import {SoundcloudWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/soundcloud-widget/soundcloud-widget-dialog';
import {VimeoWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/vimeo-widget/vimeo-widget-dialog';
import {SpotifyWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/spotify-widget/spotify-widget-dialog';
import {TiktokWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/tiktok-widget/tiktok-widget-dialog';

export interface WidgetListItem {
  name: MessageDescriptor;
  description: MessageDescriptor;
  image?: string;
  dialog: JSXElementConstructor<WidgetDialogProps<any>>;
}

export enum WidgetType {
  Image = 'image',
  Text = 'text',
  Socials = 'socials',
  Youtube = 'youtube',
  Soundcloud = 'soundcloud',
  Vimeo = 'video',
  Spotify = 'spotify',
  Twitch = 'twitch',
  Tiktok = 'tiktok',
}

export const WidgetList: Record<WidgetType, WidgetListItem> = {
  [WidgetType.Image]: {
    name: message('Image'),
    image: imageThumbnail,
    description: message(
      'Upload an image and optionally add a link it will redirect to when clicked.'
    ),
    dialog: ImageWidgetDialog,
  },
  [WidgetType.Text]: {
    name: message('Text'),
    image: textImage,
    description: message(
      'Add title and optional description. Can be used as a header for the whole biolink or a group of multiple widgets.'
    ),
    dialog: TextWidgetDialog,
  },
  [WidgetType.Socials]: {
    name: message('Social Links'),
    image: socialsImage,
    description: message(
      'Add your socials links to display them as icon buttons.'
    ),
    dialog: SocialsWidgetDialog,
  },
  [WidgetType.Youtube]: {
    name: message('Youtube Video'),
    image: youtubeImage,
    description: message(
      'Paste a YouTube video URL to show it as a video embed in your profile.'
    ),
    dialog: YoutubeWidgetDialog,
  },
  [WidgetType.Soundcloud]: {
    name: message('Soundcloud Audio'),
    image: soundcloudImage,
    description: message(
      'Paste a SoundCloud URL to show it as a playable song in your profile.'
    ),
    dialog: SoundcloudWidgetDialog,
  },
  [WidgetType.Vimeo]: {
    name: message('Vimeo Video'),
    image: vimeoImage,
    description: message(
      'Paste a vimeo URL to show it as a video embed in your profile.'
    ),
    dialog: VimeoWidgetDialog,
  },
  [WidgetType.Spotify]: {
    name: message('Spotify Embed'),
    image: spotifyImage,
    description: message(
      'Paste a spotify song, album, artist, playlist, podcast or episode url to show it as an embed in your profile.'
    ),
    dialog: SpotifyWidgetDialog,
  },
  [WidgetType.Twitch]: {
    name: message('Twitch Embed'),
    image: twitchImage,
    description: message(
      'Paste twitch profile or clip url to show it as an embed in your profile.'
    ),
    dialog: TwitchWidgetDialog,
  },
  [WidgetType.Tiktok]: {
    name: message('TikTok Embed'),
    image: tiktokImage,
    description: message(
      'Paste TikTok video url to show it as an embed in your profile.'
    ),
    dialog: TiktokWidgetDialog,
  },
};
