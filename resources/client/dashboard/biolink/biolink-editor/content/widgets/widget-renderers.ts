import {JSXElementConstructor} from 'react';
import {ImageWidgetRenderer} from '@app/dashboard/biolink/biolink-editor/content/widgets/image-widget/image-widget-renderer';
import {WidgetRendererProps} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-renderer-props';
import {YoutubeWidgetRenderer} from '@app/dashboard/biolink/biolink-editor/content/widgets/youtube-widget/youtube-widget-renderer';
import {TextWidgetRenderer} from '@app/dashboard/biolink/biolink-editor/content/widgets/text-widget/text-widget-renderer';
import {SocialsWidgetRenderer} from '@app/dashboard/biolink/biolink-editor/content/widgets/socials-widget/socials-widget-renderer';
import {TwitchWidgetRenderer} from '@app/dashboard/biolink/biolink-editor/content/widgets/twitch-widget/twitch-widget-renderer';
import {SoundcloudWidgetRenderer} from '@app/dashboard/biolink/biolink-editor/content/widgets/soundcloud-widget/soundcloud-widget-renderer';
import {VimeoWidgetRenderer} from '@app/dashboard/biolink/biolink-editor/content/widgets/vimeo-widget/vimeo-widget-renderer';
import {SpotifyWidgetRenderer} from '@app/dashboard/biolink/biolink-editor/content/widgets/spotify-widget/spotify-widget-renderer';
import {TiktokWidgetRenderer} from '@app/dashboard/biolink/biolink-editor/content/widgets/tiktok-widget/tiktok-widget-renderer';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-type';

export const WidgetRenderers: Record<
  WidgetType,
  JSXElementConstructor<WidgetRendererProps<any>>
> = {
  [WidgetType.Image]: ImageWidgetRenderer,
  [WidgetType.Text]: TextWidgetRenderer,
  [WidgetType.Socials]: SocialsWidgetRenderer,
  [WidgetType.Youtube]: YoutubeWidgetRenderer,
  [WidgetType.Soundcloud]: SoundcloudWidgetRenderer,
  [WidgetType.Vimeo]: VimeoWidgetRenderer,
  [WidgetType.Spotify]: SpotifyWidgetRenderer,
  [WidgetType.Twitch]: TwitchWidgetRenderer,
  [WidgetType.Tiktok]: TiktokWidgetRenderer,
};
