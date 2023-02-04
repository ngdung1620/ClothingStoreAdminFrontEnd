import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RevenueRequest} from "../models/revenueModel";
import {OrderModel} from "../../pages/manage-order/models/order";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(private httpClient: HttpClient) { }
  getRevenue = (data: RevenueRequest) => this.httpClient.post<OrderModel[]>(`${environment.api_domain}/Order/revenue`,data);
}
