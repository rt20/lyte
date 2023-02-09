import {createContext, ReactNode, useState} from 'react';
import {StoreApi} from 'zustand';
import {createPlayerStore, PlayerState} from '@common/player/player-store';
import {PlayerStoreOptions} from '@common/player/player-store-options';

export const PlayerStoreContext = createContext<StoreApi<PlayerState>>(null!);

interface PlayerContextProps {
  children: ReactNode;
  id: string | number;
  options: PlayerStoreOptions;
}
export function PlayerContext({children, id, options}: PlayerContextProps) {
  //lazily create store object only once
  const [store] = useState(() => {
    return createPlayerStore(id, options);
  });

  return (
    <PlayerStoreContext.Provider value={store}>
      {children}
    </PlayerStoreContext.Provider>
  );
}
