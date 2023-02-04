export interface OrderModel {
  orderId: string;
  orderDate: string;
  status: number;
  totalPrice: number;
  shippingFee: number;
  customerName: string;
  phoneNumber: string;
  address: string;
}
export interface OrderOptionRequest {
  search: string;
  status: number;
  pageIndex: number;
  pageSize: number;
}
export interface OrderOptionResponse {
  listOrder: OrderModel[];
  totalPage: number;
  PageIndex: number;
  PageSize: number;
  TotalRecords: number;
}
export interface GetOrderResponse {
  orderId: string;
  orderDate: Date;
  status: number;
  totalPrice: number;
  shippingFee: number;
  customerName: string;
  phoneNumber: string;
  address: string;
  productOrders: ProductOrderModel[];
}
export interface ProductOrderModel {
  productId: string;
  productName: string;
  quantity: number;
  size: string;
  price: number;
  img: string;

}
export interface ChangeStatus {
  status: number;
  orderId: string;
}
