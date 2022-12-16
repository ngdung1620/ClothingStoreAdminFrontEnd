import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateProductRequest, ListProductRequest, ListProductResponse, ProductResponse} from "../Models/ProductModels";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  _idProductSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  idProduct$: Observable<string> = this._idProductSubject.asObservable();

  createProduct = (data: any) => this.httpClient.post<ProductResponse>(`${environment.api_domain}/Product/create-product`,data);
  listProduct = (data: ListProductRequest) => this.httpClient.post<ListProductResponse>(`${environment.api_domain}/Product/get-list-product`,data);
  deleteProduct = (id: string) => this.httpClient.delete(`${environment.api_domain}/Product/delete-product/${id}`);
  getProduct = (id: string) => this.httpClient.get<ProductResponse>(`${environment.api_domain}/Product/get-product/${id}`).pipe(
  );
  editProduct = (data: any) => this.httpClient.post<ProductResponse>(`${environment.api_domain}/Product/edit-product`,data);
}
