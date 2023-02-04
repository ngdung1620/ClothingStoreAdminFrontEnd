import { Component, OnInit } from '@angular/core';
import {ChangeStatus, GetOrderResponse} from "../../models/order";
import {OrderService} from "../../services/order.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Location} from "@angular/common";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  dataOrder: GetOrderResponse = {
    orderId : '',
    orderDate : new Date(),
    status : 0,
    totalPrice : 0,
    shippingFee : 0,
    customerName : '',
    phoneNumber : '',
    address : '',
    productOrders: []
  };
  temporaryPrice = 0;
  status = '';
  idOrder = '';
  constructor(private orderService: OrderService,
              private notificationService: NzNotificationService,
             private location: Location) { }

  ngOnInit(): void {
    this.orderService.idOrder$.subscribe(idOrder => {
      if(idOrder == ''){
        history.back();
      }
      else {
        this.idOrder = idOrder;
        this.orderService.getOrder(idOrder).subscribe(res => {
          this.dataOrder = res;
          res.productOrders.forEach(p => {
            this.temporaryPrice += p.price * p.quantity
          })
          this.status = res.status.toString();
        })
      }
    })
  }
  handleData(orderDate: string){
    let d = new Date(orderDate);
    const date = d.toISOString().split('T')[0].split("-").reverse().join("-");
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`
  }
  convertNumber(s: any) {
    if(typeof s == "number") {
      let tmp = s.toString();
      return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return s;
  }
  handleStatus(s: number){
    let result = '';
    switch (s) {
      case 1:
        result = "Chờ xử lí"
        break;
      case 2:
        result = "Chờ giao hàng"
        break;
      case 3:
        result = "Đang giao"
        break;
      case 4:
        result = "Hoàn thành"
        break;
      case -1:
        result = "Đã huỷ"
        break;
    }
    return result;
  }

  handleChangeStatus($event: any) {
    const data: ChangeStatus = {
      status: $event,
      orderId: this.idOrder
    }
    this.orderService.changeStatus(data).subscribe(res => {
      this.notificationService.success("Thành công",res.message);
    })
  }

  handleClickArrow() {
    this.location.back();
  }
}
