import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  CreateUserRequest,
  CreateUserResponse, EditUserRequest,
  ListRoleResponse,
  ListUserRequest,
  ListUserResponse, UserResponse
} from "../models/accountModels";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  idUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  _idUser$: Observable<string> = this.idUserSubject.asObservable();

  constructor(private httpClient: HttpClient) { }
  getListUser = (data: ListUserRequest) => this.httpClient.post<ListUserResponse>(`${environment.api_domain}/Authentication/get-list-user`,data);
  getRole = () => this.httpClient.get<ListRoleResponse>(`${environment.api_domain}/Role/get-list-role`);
  createUser = (data: CreateUserRequest) => this.httpClient.post<CreateUserResponse>(`${environment.api_domain}/Authentication/registration`,data);
  deleteUser = (id: string) => this.httpClient.delete(`${environment.api_domain}/Authentication/delete-user/${id}`)
  getUser = (id: string) => this.httpClient.get<UserResponse>(`${environment.api_domain}/Authentication/get-user/${id}`);
  editUser = (data: EditUserRequest) => this.httpClient.post(`${environment.api_domain}/Authentication/edit-user`,data)
}
