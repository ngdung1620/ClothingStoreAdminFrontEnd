import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserResponse} from "../models/landingPage";

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  idUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  _idUser$: Observable<string> = this.idUserSubject.asObservable();
  constructor(private httpClient: HttpClient) { }
  getUser  = (id: string) => this.httpClient.get<UserResponse>(`${environment.api_domain}/Authentication/get-user/${id}`)
}
