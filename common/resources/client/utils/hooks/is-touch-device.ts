import {useMediaQuery} from './use-media-query';

export function useIsTouchDevice() {
  return useMediaQuery('((hover: none) and (pointer: coarse))');
}
