import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateSizeRequest, EditSizeRequest, SizeResponse} from "../Models/SizeModels";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SizeServiceService {

  constructor(private httpClient: HttpClient) { }

  createSize = (data: CreateSizeRequest) => this.httpClient.post<SizeResponse>(`${environment.api_domain}/Size/create-size`,data);
  getListSize = () =>  this.httpClient.get<SizeResponse>(`${environment.api_domain}/Size/get-list-size`);
  deleteSize = (id: string) => this.httpClient.delete(`${environment.api_domain}/Size/delete-size/${id}`);
  editSize = (data : EditSizeRequest) => this.httpClient.post<SizeResponse>(`${environment.api_domain}/Size/edit-size`,data);
}
