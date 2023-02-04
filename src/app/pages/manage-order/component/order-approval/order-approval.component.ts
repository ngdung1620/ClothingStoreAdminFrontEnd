import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {OrderModel} from "../../models/order";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-approval',
  templateUrl: './order-approval.component.html',
  styleUrls: ['./order-approval.component.scss']
})
export class OrderApprovalComponent implements OnInit {
  listOfData: OrderModel[] = [];

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrderWaitHandle().subscribe(res => {
      this.listOfData = res;
    })
  }
  handleData(orderDate: string){
    let d = new Date(orderDate);
    const date = d.toISOString().split('T')[0].split("-").reverse().join("-");
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`
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
  convertNumber(s: any) {
    if(typeof s == "number") {
      let tmp = s.toString();
      return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return s;
  }
  handleClassStatus(s: number) {
    let result = '';
    switch (s) {
      case 1:
        result = "approval"
        break;
      case 2:
        result = "approval"
        break;
      case 3:
        result = "delivering"
        break;
      case 4:
        result = "finished"
        break;
      case -1:
        result = "cancel"
        break;
    }
    return result;
  }
  handleClick(orderId: any) {
    this.orderService._idOrderSubject.next(orderId);
    this.router.navigate(['manage-order/order_detail'])
  }
}
