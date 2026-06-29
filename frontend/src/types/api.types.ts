export interface ApiResponse<T> {
  success : boolean;
  message : string;
  data    : T;
}

export interface PaginatedData<T> {
  data  : T[];
  total : number;
  page  : number;
  limit : number;
  pages : number;
}

export interface ContactPayload {
  name   : string;
  email  : string;
  subject: string;
  message: string;
  budget?: string;
}
