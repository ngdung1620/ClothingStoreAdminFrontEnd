import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import { OrderOptionRequest} from "../../models/order";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  search = "";
  status = '0';
  listOfData: any;
  totalPage = 0;
  pageIndex = 1;
  pageSize = 5;

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    const data:OrderOptionRequest ={
      search:'',
      status: 0,
      pageIndex: 1,
      pageSize: 5,
    }
    this.orderService.getOrderOption(data).subscribe(res =>{
      this.listOfData = res.listOrder;
      this.totalPage = res.totalRecords;
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

  handleChangeStatus(e: any) {
    const data:OrderOptionRequest ={
      search: this.search,
      status: e,
      pageIndex: 1,
      pageSize: 5,
    }
    this.orderService.getOrderOption(data).subscribe(res => {
      this.listOfData = res.listOrder;
      this.totalPage = res.totalRecords;
    });
  }

  handleClickSearch() {
    const data:OrderOptionRequest ={
      search: this.search,
      status: Number(this.status),
      pageIndex: 1,
      pageSize: 5,
    }
    this.orderService.getOrderOption(data).subscribe(res => {
      this.listOfData = res.listOrder;
      this.totalPage = res.totalRecords;
    });
  }

  handleChangeIndex($event: number) {
    const data:OrderOptionRequest ={
      search: this.search,
      status: Number(this.status),
      pageIndex: $event,
      pageSize: 5,
    }
    this.orderService.getOrderOption(data).subscribe(res => {
      this.listOfData = res.listOrder;
      this.totalPage = res.totalRecords;
    });
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
