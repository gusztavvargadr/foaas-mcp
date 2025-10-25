export interface FoaasResponse {
  message: string;
  subtitle: string;
}

export interface FoaasOperation {
  name: string;
  url: string;
  fields: Array<{
    name: string;
    field: string;
  }>;
}
