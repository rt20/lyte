import urlRegex from 'url-regex';

export function urlIsValid(url: string): boolean {
  return urlRegex({exact: true, strict: false}).test(url);
}
