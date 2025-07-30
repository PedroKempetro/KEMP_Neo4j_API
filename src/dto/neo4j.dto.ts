export interface CreateNodeDto {
  label: string;
  properties: Record<string, any>;
}

export interface CreateDataDto {
  id?: string;
  name?: string;
  description?: string;
  [key: string]: any;
}

export interface ExecuteCypherDto {
  query: string;
  params?: Record<string, any>;
}

export interface FindNodeDto {
  label: string;
  properties?: Record<string, any>;
}

export interface Neo4jResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  count?: number;
}
