import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';

const endpoint = 'link/usage';

export interface ResourceUsage {
  used: number;
  total: number | null;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
  createMsgType?: CreateMsgType;
}

export interface LinkFeaturePermissions {
  alias: boolean;
  password: boolean;
  expiration: boolean;
  utm: boolean;
  retargeting: boolean;
}

export type CreateMsgType =
  | 'overQuota'
  | 'noPermission'
  | 'noWorkspacePermission'
  | keyof LinkFeaturePermissions;

export interface FetchLinkUsageResponse extends BackendResponse {
  forWorkspace?: boolean;
  userOwnsWorkspace?: boolean;
  usage: {
    links: ResourceUsage & LinkFeaturePermissions;
    biolinks: ResourceUsage;
    link_clicks: ResourceUsage;
    link_overlays: ResourceUsage;
    custom_pages: ResourceUsage;
    custom_domains: ResourceUsage;
    link_groups: ResourceUsage;
    tracking_pixels: ResourceUsage;
  };
}

export function useLinkSummary() {
  return useQuery([endpoint], () => fetchLinkUsage());
}

function fetchLinkUsage(): Promise<FetchLinkUsageResponse> {
  return apiClient.get(endpoint).then(response => response.data);
}
