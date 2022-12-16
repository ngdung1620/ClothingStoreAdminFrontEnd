export interface Login {
  email: string;
  password: string
}
export interface LoginResponse {
  status: number;
  message: string;
  token: string;
}
