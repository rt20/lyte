import {
  FetchValueListsResponse,
  prefetchValueLists,
  useValueLists,
} from '@common/http/value-lists';
import {useAuth} from '@common/auth/use-auth';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

const names: (keyof FetchValueListsResponse)[] = [
  'countries',
  'domains',
  'pages',
  'overlays',
  'pixels',
  'groups',
];

export function useLinkFormValueLists() {
  const {user} = useAuth();
  return useValueLists(names, {userId: user?.id, pageType: 'link_page'});
}

export function prefetchLinkFormValueLists() {
  prefetchValueLists(names, {
    userId: getBootstrapData().user?.id,
    pageType: 'link_page',
  });
}
