import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {memo} from 'react';
import clsx from 'clsx';

type DangerousHtml = {__html: string} | undefined;

interface Props {
  src: string;
  className?: string;
}
export const SvgImage = memo(({src, className}: Props) => {
  const {data: svgString} = useSvgImageContent(src);
  if (svgString) {
    return (
      <div
        className={clsx(
          'inline-block bg-no-repeat h-full svg-image-container',
          className
        )}
        dangerouslySetInnerHTML={svgString}
      />
    );
  }
  return null;
});

function useSvgImageContent(src: string) {
  return useQuery(['svgImage', src], () => fetchSvgImageContent(src), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!src,
  });
}

function fetchSvgImageContent(src: string): Promise<DangerousHtml> {
  return axios
    .get(src, {
      responseType: 'text',
    })
    .then(response => {
      return {__html: response.data};
    });
}
