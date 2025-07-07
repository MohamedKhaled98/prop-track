export interface PaginatedResponse<T = any> {
  page: number;
  data: T[];
  total: number;
  totalPages: number;
  limit: number;
}

export interface BaseQueryFilter {
  filter: {
    search: string;
  };
  sortBy?: [string, string][];
  page?: number;
  limit?: number;
}

export type With<T, U> = T & U;
