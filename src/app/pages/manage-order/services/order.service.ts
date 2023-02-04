import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ChangeStatus, GetOrderResponse, OrderModel, OrderOptionRequest, OrderOptionResponse} from "../models/order";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  _idOrderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  idOrder$: Observable<string> = this._idOrderSubject.asObservable();
  getOrder = (id: string) => this.httpClient.get<GetOrderResponse>(`${environment.api_domain}/Order/get-order/${id}`);
  getOrderWaitHandle = () => this.httpClient.get<OrderModel[]>(`${environment.api_domain}/Order/get-order-wait-handle`);
  getOrderOption = (data: OrderOptionRequest) => this.httpClient.post<OrderOptionResponse>(`${environment.api_domain}/Order/get-order-option`,data);
  changeStatus = (data: ChangeStatus) => this.httpClient.post<any>(`${environment.api_domain}/Order/change-status`,data);
}
