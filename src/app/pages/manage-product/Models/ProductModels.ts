export interface ProductResponse {
  id: string;
  name: string;
  price: number;
  description: string;
  total: number;
  img: string;
  categoryId: string;
  listSizes: Size[];
}
export interface Size {
  id: string;
  name: number;
}
export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  total: number;
  imgFile: FormData;
  sizes: string[];
  categoryId: string;
}
export interface ListProductRequest {
  search: string;
  pageIndex: number;
  pageSize: number;
}
export interface ListProductResponse {
  products: ProductResponse;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
}
