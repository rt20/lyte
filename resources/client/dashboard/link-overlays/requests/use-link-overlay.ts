import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';

export const linkOverlayEndpoint = (overlayId: number | string) =>
  `link-overlay/${overlayId}`;

export interface GetLinkOverlayResponse extends BackendResponse {
  linkOverlay: LinkOverlay;
}

export function useLinkOverlay(overlayId: number | string) {
  return useQuery([linkOverlayEndpoint(overlayId)], () =>
    getLinkOverlay(overlayId)
  );
}

function getLinkOverlay(
  overlayId: number | string
): Promise<GetLinkOverlayResponse> {
  return apiClient
    .get(linkOverlayEndpoint(overlayId))
    .then(response => response.data);
}
