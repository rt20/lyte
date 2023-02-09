import {YoutubeMediaItem} from '@common/player/media-item';
import {PlayerState} from '@common/player/player-store';
import {RefObject} from 'react';
import OnStateChangeEvent = YT.OnStateChangeEvent;

export interface PlayerStoreOptions {
  ref: RefObject<HTMLElement>;
  defaultVolume?: number;
  onError?: (player: PlayerState, e?: any) => void;
  onDestroy?: () => void;
  youtube?: {
    srcResolver?: (mediaItem: YoutubeMediaItem) => Promise<YoutubeMediaItem>;
    suggestedQuality?: YT.SuggestedVideoQuality;
    onStateChange?: (e: OnStateChangeEvent) => void;
  };
}
