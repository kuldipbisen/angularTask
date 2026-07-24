export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  offset: number;
  count: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
