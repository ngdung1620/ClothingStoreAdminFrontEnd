import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login, LoginResponse} from "../models/login";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private jwtHelperService: JwtHelperService) { }
  login = (data: Login) => this.httpClient.post<LoginResponse>(`${environment.api_domain}/Authentication/login`, data);

  public token = () => {
    const token = sessionStorage.getItem('token') ?? '';
    const objectToken = this.decodeToken(token);
    return objectToken;
  }

  public decodeToken = (rawToken: string) => this.jwtHelperService?.decodeToken(rawToken);
}
