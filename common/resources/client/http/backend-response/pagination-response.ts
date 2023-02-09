import {BackendResponse} from './backend-response';

export interface PaginationResponse<T> {
  data: T[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  prev_cursor: string;
  next_cursor: string;
  next_page: number | null;
  prev_page: number | null;
}

export const EMPTY_PAGINATION_RESPONSE = {
  pagination: {data: []},
};

export interface PaginatedBackendResponse<T> extends BackendResponse {
  pagination: PaginationResponse<T>;
}
