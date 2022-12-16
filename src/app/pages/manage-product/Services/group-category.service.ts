import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CreateGroupRequest, EditGroupCategoryRequest, GroupCategoryResponse} from "../Models/GroupCategory";

@Injectable({
  providedIn: 'root'
})
export class GroupCategoryService {

  constructor(private httpClient: HttpClient) { }
  getListGroupCategory = () => this.httpClient.get<GroupCategoryResponse>(`${environment.api_domain}/GroupCategory/get-list-group-category`);
  createGroupCategory = (data: CreateGroupRequest) => this.httpClient.post<GroupCategoryResponse>(`${environment.api_domain}/GroupCategory/create-group-category`,data);
  deleteGroupCategory = (id: string) => this.httpClient.delete(`${environment.api_domain}/GroupCategory/delete-group-category/${id}`);
  editGroupCategory = (data: EditGroupCategoryRequest) => this.httpClient.post<GroupCategoryResponse>(`${environment.api_domain}/GroupCategory/edit-group-category`,data)
}
