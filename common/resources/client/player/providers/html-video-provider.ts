import {PlayerProvider} from '@common/player/providers/player-provider';
import {HtmlVideoMediaItem} from '@common/player/media-item';

export class HtmlVideoProvider extends PlayerProvider {
  name = 'htmlVideo' as const;

  protected element?: HTMLVideoElement;
  protected cuedTrack?: HtmlVideoMediaItem;

  async play(media: HtmlVideoMediaItem) {
    await this.cueMedia(media);
    try {
      await this.element?.play();
    } catch (e) {
      this.listeners.onError?.(e);
    }
  }

  pause() {
    this.element?.pause();
  }

  stop() {
    this.pause();
    this.seekTo(0);
  }

  seekTo(time: number) {
    if (time === Infinity || !this.element) return;
    this.element.currentTime = time;
  }

  getDuration() {
    return this.element?.seekable.length > 0
      ? this.element?.seekable.end(0)
      : 0;
  }

  getCurrentTime() {
    return this.element?.currentTime || 0;
  }

  setVolume(volume: number) {
    if (this.element) {
      this.element.volume = volume / 100;
    }
  }

  setMuted(isMuted: boolean) {
    if (this.element) {
      this.element.muted = isMuted;
    }
  }

  async cueMedia(media: HtmlVideoMediaItem): Promise<any> {
    if (this.cuedTrack?.id === media?.id) return;

    this.createElement();

    if (!this.element) {
      this.listeners.onError?.();
      return;
    }

    this.element.src = media.src;
    if (media.image) {
      this.element.poster = media.image;
    }
    this.cuedTrack = media;
  }

  getFullscreenEl() {
    return this.element;
  }

  destroy() {
    super.destroy();
    this.element && this.element.remove();
    this.element = undefined;
    this.cuedTrack = undefined;
  }

  private createElement() {
    if (this.element) return;

    this.element = document.createElement('video');
    this.element.setAttribute('playsinline', 'true');
    this.element.setAttribute('oncontextmenu', 'return false;');
    this.element.setAttribute('controlsList', 'nodownload');
    this.element.id = 'html5-player';
    this.options.ref.current?.appendChild(this.element);

    this.setMuted(this.initialState.muted);
    this.setVolume(this.initialState.volume);

    this.bindStateChangeEvents();
  }

  private bindStateChangeEvents() {
    if (!this.element) return;
    this.element.addEventListener('ended', () => {
      this.listeners.onPlaybackEnd?.();
    });

    this.element.addEventListener('playing', () => {
      this.listeners.onPlay?.();
    });

    this.element.addEventListener('pause', () => {
      this.listeners.onPause?.();
    });

    // todo: see if there's a buffer event

    this.element.addEventListener('error', e => {
      this.listeners.onError?.(e);
    });
  }
}
