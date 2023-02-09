import {Link} from '@app/dashboard/links/link';

export function buildLongUrlWithUtm(link: Link): string {
  const url = new URL(link.long_url);
  if (link.utm) {
    new URLSearchParams(link.utm).forEach((key, value) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
}
