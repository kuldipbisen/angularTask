export interface IEnvironment {
  production: boolean;
  apiUrl: string;
  pagination: {
    defaultPageSize: number;
    maxPageSize: number;
  };
}
