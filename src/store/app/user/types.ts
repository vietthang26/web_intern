export interface User {
  id: number;
  username: string;
  token: string;
  role: number;
  status: number;
  // createTime: number
}

export interface UserState {
  user?: User;
  isLoading: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
}
