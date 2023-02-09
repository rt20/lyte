import {Link} from '@app/dashboard/links/link';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import React from 'react';

interface LinkImageProps {
  link: Link;
  className?: string;
}
export function LinkImage({link, className}: LinkImageProps) {
  return link.image ? (
    <img className={className} alt="" src={link.image} />
  ) : (
    <RemoteFavicon className={className} url={link.long_url} />
  );
}
