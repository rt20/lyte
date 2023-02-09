import {createStore} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {PlayerProvider} from '@common/player/providers/player-provider';
import {YoutubeProvider} from '@common/player/providers/youtube-provider';
import {MediaItem} from '@common/player/media-item';
import {setInLocalStorage as _setInLocalStorage} from '@common/utils/hooks/local-storage';
import {shuffleArray} from '@common/utils/array/shuffle-array';
import {PlayerStoreOptions} from '@common/player/player-store-options';
import {
  getPlayerStateFromLocalStorage,
  PersistablePlayerState,
} from '@common/player/player-local-storage';
import {HtmlVideoProvider} from '@common/player/providers/html-video-provider';
import fscreen from 'fscreen';
import {
  prependToArrayAtIndex
} from '@common/utils/array/prepend-to-array-at-index';

type RepeatMode = 'one' | 'all' | false;

export interface ProviderListeners {
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (e?: any) => void;
  onBuffering?: () => void;
  onSeek?: (time: number) => void;
  onPlaybackEnd?: () => void;
  onCued?: (media: MediaItem) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export interface PlayerState {
  // queue
  originalQueue: MediaItem[];
  shuffledQueue: MediaItem[];
  cuedMedia?: MediaItem;

  // volume
  volume: number;
  setVolume: (value: number) => void;
  muted: boolean;
  setMuted: (isMuted: boolean) => void;

  status: 'playing' | 'paused' | 'buffering' | 'uninitialized';
  mediaDuration: number;

  repeat: RepeatMode;
  toggleRepeatMode: () => void;

  shuffling: boolean;
  toggleShuffling: () => void;

  isFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;

  provider: PlayerProvider | null;

  // actions
  getCurrentTime: () => number;
  cue: (media: MediaItem) => Promise<void>;
  play: (media?: MediaItem) => Promise<void>;
  pause: () => void;
  stop: () => void;
  playPrevious: () => void;
  playNext: () => void;
  seek: (time: number) => void;
  overrideQueue: (
    mediaItems: MediaItem[],
    queuePointer?: number
  ) => Promise<void>;
  appendToQueue: (mediaItems: MediaItem[], afterCuedMedia?: boolean) => void;
  subscribe: (listeners: ProviderListeners) => () => void;
  destroy: () => void;
  init: () => void;
}

export const createPlayerStore = (
  id: string | number,
  options: PlayerStoreOptions
) => {
  const listeners = new Set<ProviderListeners>();
  const initialData = getPlayerStateFromLocalStorage(id, options);

  const setInLocalStorage = (key: string, value: any) => {
    _setInLocalStorage(`player.${id}.${key}`, value);
  };

  return createStore<PlayerState>()(
    immer((set, get) => {
      const getPointer = (): number => {
        if (get().cuedMedia) {
          return (
            get().shuffledQueue.findIndex(
              item => item.id === get().cuedMedia?.id
            ) || 0
          );
        }
        return 0;
      };
      const getCurrentQueueItem = (): MediaItem | undefined => {
        return get().shuffledQueue[getPointer()];
      };
      const getFirstQueueItem = (): MediaItem | undefined => {
        return get().shuffledQueue[0];
      };
      const getLastQueueItem = (): MediaItem | undefined => {
        return get().shuffledQueue[get().shuffledQueue.length - 1];
      };
      const getNextQueueItem = (): MediaItem | undefined => {
        return get().shuffledQueue[getPointer() + 1];
      };
      const getPreviousQueueItem = (): MediaItem | undefined => {
        return get().shuffledQueue[getPointer() - 1];
      };

      const selectAndCreateProvider = (name: MediaItem['provider']) => {
        const storeListeners: ProviderListeners = {
          onPlay: () => {
            set(s => {
              s.status = 'playing';
            });
            listeners.forEach(l => l.onPlay?.());
            const exactDuration = get().provider?.getDuration();
            if (exactDuration) {
              set(s => {
                s.mediaDuration = exactDuration;
              });
            }
          },
          onPause: () => {
            set(s => {
              s.status = 'paused';
            });
            listeners.forEach(l => l.onPause?.());
          },
          onBuffering: () => {
            set(s => {
              s.status = 'buffering';
            });
            listeners.forEach(l => l.onBuffering?.());
          },
          onPlaybackEnd: () => {
            get().playNext();
          },
          onError: (e: any) => {
            set(s => {
              s.status = 'paused';
            });
            listeners.forEach(l => l.onError?.(e));
            options?.onError?.(get(), e);
          },
          onFullscreenChange: isFullscreen => {
            set(s => {
              s.isFullscreen = isFullscreen;
            });
          },
        };

        const currentState: PersistablePlayerState = {
          ...initialData.state,
          volume: get().volume,
          muted: get().muted,
          shuffling: get().shuffling,
          repeat: get().repeat,
        };

        switch (name) {
          case 'youtube':
            return new YoutubeProvider(storeListeners, currentState, options);
          case 'htmlVideo':
            return new HtmlVideoProvider(storeListeners, currentState, options);
        }
      };

      const initialQueue = initialData.queue || [];

      return {
        originalQueue: initialQueue,
        shuffledQueue: initialData.state.shuffling ? shuffleArray(initialQueue) :  initialQueue,
        pointer: 0,
        status: 'uninitialized',
        volume: initialData.state.volume ?? 30,
        setVolume: value => {
          get().provider?.setVolume(value);
          set(s => {
            s.volume = value;
          });
          setInLocalStorage('volume', value);
        },
        muted: initialData.state.muted ?? false,
        setMuted: isMuted => {
          get().provider?.setMuted(isMuted);
          set(s => {
            s.muted = isMuted;
          });
          setInLocalStorage('muted', isMuted);
        },
        repeat: initialData.state.repeat ?? 'all',
        toggleRepeatMode: () => {
          let newRepeat: RepeatMode = 'all';
          const currentRepeat = get().repeat;
          if (currentRepeat === 'all') {
            newRepeat = 'one';
          } else if (currentRepeat === 'one') {
            newRepeat = false;
          }

          set(s => {
            s.repeat = newRepeat;
          });
          setInLocalStorage('repeat', newRepeat);
        },
        shuffling: initialData.state.shuffling ?? false,
        toggleShuffling: () => {
          let newQueue: MediaItem[] = [];

          if (get().shuffling) {
            newQueue = get().originalQueue;
          } else {
            newQueue = shuffleArray([...get().shuffledQueue]);
          }

          set(s => {
            s.shuffling = !s.shuffling;
            s.shuffledQueue = newQueue;
          });
        },
        mediaDuration: 0,
        provider: null,
        seek: time => {
          get().provider?.seekTo(time);
          listeners.forEach(l => l.onSeek?.(time));
        },
        subscribe: listener => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        getCurrentTime: () => {
          return get().provider?.getCurrentTime() || 0;
        },
        play: async media => {
          // get currently active queue item, if none is provided
          if (media) {
            await get().cue(media);
          } else {
            media = getCurrentQueueItem();
          }
          // if no media to play, stop player and bail
          if (!media) {
            get().stop();
            return;
          }
          await get().provider?.play(media);
        },
        pause: () => {
          get().provider?.pause();
        },
        stop: () => {
          if (get().status !== 'playing') return;
          get().pause();
          get().seek(0);

          set(s => {
            s.status = 'paused';
          });

          // tODO:
          //this.state.firePlaybackStopped();
        },
        playNext: async () => {
          get().stop();
          let media = getCurrentQueueItem();
          const isLastQueueItem =
            get().shuffledQueue.length - 1 === getPointer();

          if (get().repeat === 'all' && isLastQueueItem) {
            media = getFirstQueueItem();
          } else if (get().repeat !== 'one') {
            media = getNextQueueItem();
          }

          if (media) {
            await get().play(media);
          } else {
            get().seek(0);
            get().play();
          }
        },
        playPrevious: async () => {
          get().stop();
          let media = getCurrentQueueItem();

          if (get().repeat === 'all' && getPointer() === 0) {
            media = getLastQueueItem();
          } else if (get().repeat !== 'one') {
            media = getPreviousQueueItem();
          }

          if (media) {
            await get().play(media);
          } else {
            get().seek(0);
            get().play();
          }
        },
        cue: async media => {
          if (get().cuedMedia?.id === media.id) return;

          // select new provider (if needed) and destroy previous one
          if (get().provider?.name !== media.provider) {
            get().provider?.destroy();
            const newProvider = selectAndCreateProvider(media.provider);
            if (newProvider) {
              set(s => {
                s.provider = newProvider;
              });
            }
          }

          set(s => {
            s.cuedMedia = media;
          });

          await get().provider!.cueMedia(media);

          // wait for provider to cue media before trying to get the duration
          set(s => {
            s.mediaDuration =
              get().provider?.getDuration() || get().cuedMedia?.duration || 0;
            if (s.status === 'uninitialized') {
              s.status = 'paused';
            }
          });

          listeners.forEach(listener => listener.onCued?.(media));

          setInLocalStorage('cuedMediaId', media.id);
        },
        async overrideQueue(
          mediaItems: MediaItem[],
          queuePointer: number = 0
        ): Promise<any> {
          if (!mediaItems?.length) return;
          const items = [...mediaItems];
          set(s => {
            s.shuffledQueue = get().shuffling
              ? shuffleArray(items, true)
              : items;
            s.originalQueue = items;
          });
          setInLocalStorage('queue', get().originalQueue.slice(0, 15));
          const media =
            queuePointer > -1
              ? mediaItems[queuePointer]
              : getCurrentQueueItem();
          if (media) {
            return get().cue(media);
          }
        },
        appendToQueue: (mediaItems, afterCuedMedia = true) => {
          const shuffledNewItems = get().shuffling
            ? shuffleArray([...mediaItems])
            : [...mediaItems];
          const index = afterCuedMedia ? getPointer() : 0;
          set(s => {
            s.shuffledQueue = prependToArrayAtIndex(s.shuffledQueue, shuffledNewItems, index);
            s.originalQueue = prependToArrayAtIndex(s.shuffledQueue, mediaItems, index);
          });
          setInLocalStorage('queue', get().originalQueue.slice(0, 15));
        },
        isFullscreen: false,
        enterFullscreen: () => {
          get().provider?.enterFullscreen();
        },
        exitFullscreen: () => {
          fscreen.exitFullscreen();
        },
        destroy: () => {
          get().provider?.destroy();
          options?.onDestroy?.();
        },
        init: () => {
          const mediaToCue = initialData.queue.find(
            media => media.id === initialData.cuedMediaId
          );
          if (mediaToCue) {
            get().cue(mediaToCue);
          }
        },
      };
    })
  );
};
