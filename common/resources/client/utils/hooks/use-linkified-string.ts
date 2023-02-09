import {useMemo} from 'react';
import linkifyStr from 'linkify-string';
import type {Opts} from 'linkifyjs';

export function useLinkifiedString(text: string | null, options?: Opts) {
  return useMemo(() => {
    if (!text) {
      return text;
    }
    return linkifyStr(text, {
      nl2br: true,
      attributes: {rel: 'nofollow', ...options?.attributes},
      ...options,
    });
  }, [text]);
}
