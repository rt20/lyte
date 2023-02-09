import {getFromLocalStorage} from '@common/utils/hooks/local-storage';
import type {PlayerState} from '@common/player/player-store';
import {PlayerStoreOptions} from '@common/player/player-store-options';

export interface PersistablePlayerState {
  muted: PlayerState['muted'];
  repeat: PlayerState['repeat'];
  shuffling: PlayerState['shuffling'];
  volume: PlayerState['volume'];
}

interface PlayerLocalStorageData {
  state: PersistablePlayerState;
  queue: PlayerState['originalQueue'];
  cuedMediaId?: string | number;
}

export function getPlayerStateFromLocalStorage(
  id: string | number,
  options?: PlayerStoreOptions
): PlayerLocalStorageData {
  const defaultVolume = options?.defaultVolume || 30;
  return {
    state: {
      muted: getFromLocalStorage(`player.${id}.muted`) ?? false,
      repeat: getFromLocalStorage(`player.${id}.repeat`) ?? 'all',
      shuffling: getFromLocalStorage(`player.${id}.shuffling`) ?? false,
      volume: getFromLocalStorage(`player.${id}.volume`) ?? defaultVolume,
    },
    queue: getFromLocalStorage(`player.${id}.queue`, []),
    cuedMediaId: getFromLocalStorage(`player.${id}.cuedMediaId`),
  };
}
