import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryResponse, CreateCategoryRequest, EditCategoryRequest} from "../Models/CategoryModels";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  getListCategory = () => this.httpClient.get<CategoryResponse>(`${environment.api_domain}/Category/get-list-category`);
  createCategory = (data: CreateCategoryRequest) => this.httpClient.post(`${environment.api_domain}/Category/create-category`,data);
  deleteCategory = (id: string) => this.httpClient.delete(`${environment.api_domain}/Category/delete-category/${id}`);
  editCategory = (data: EditCategoryRequest) => this.httpClient.post(`${environment.api_domain}/Category/edit-category`,data);
}
