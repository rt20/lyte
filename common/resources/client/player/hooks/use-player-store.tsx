import {StoreApi, useStore} from 'zustand';
import {useContext} from 'react';
import {PlayerState} from '@common/player/player-store';
import {PlayerStoreContext} from '@common/player/player-context';

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type UsePlayerStore = {
  (): ExtractState<StoreApi<PlayerState>>;
  <U>(
    selector: (state: ExtractState<StoreApi<PlayerState>>) => U,
    equalityFn?: (a: U, b: U) => boolean
  ): U;
};

// @ts-ignore
export const usePlayerStore: UsePlayerStore = (selector, equalityFn) => {
  const store = useContext(PlayerStoreContext);
  return useStore(store, selector, equalityFn);
};
