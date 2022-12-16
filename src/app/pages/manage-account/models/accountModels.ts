export interface UserResponse {
  userId : string;
  fullName : string;
  gender : number;
  doB : number;
  phoneNumber : string;
  address : string;
  email : string;
  roles: string[];
}
export interface ListUserResponse {
  users: UserResponse[];
  totalPage: number;
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
}
export interface ListUserRequest {
  search: string;
  pageIndex: number;
  pageSize: number;
}
export interface ListRoleResponse {
  id: string;
  name: string;
}
export interface CreateUserRequest {
  fullName: string;
  gender: number;
  doB: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
  roles: string[];
}
export interface CreateUserResponse {
  status: number;
  message: string;
}
export interface EditUserRequest {
  userId : string;
  fullName : string;
  gender : number;
  doB : number;
  phoneNumber : string;
  address : string;
  roles: string[];
}

