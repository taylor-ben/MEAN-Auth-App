export interface ResponseData {
  success: boolean;
  token?: string;
  user?: {
    _doc: User
  };
  msg?: string;
}

export interface User {
  _id?: string;
  email: string;
  name: string;
  username: string;
}
