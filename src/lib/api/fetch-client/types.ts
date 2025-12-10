export type FetchOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};
