import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RevenueService} from "./services/revenue.service";
import {OrderModel} from "../pages/manage-order/models/order";
import {RevenueRequest} from "./models/revenueModel";

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  optionTime =  "0";
  optionUpdate = 0;
  date = '';
  formData!: FormGroup;
  totalRevenue = 0;
  totalShip = 0;
  totalOrder = 0;
  listOfData: OrderModel[] = [];
  constructor(private fb: FormBuilder,
              private revenueService: RevenueService,
              ) { }

  ngOnInit(): void {
    this.handleDateByOption();
  }

  handleChangeOptionTime(e: any) {
    this.optionUpdate = e;
    this.totalRevenue = 0;
    this.totalOrder = 0;
    this.totalShip = 0;
    this.handleDateByOption();
  }
  handleDateByOption (){
    if(this.optionUpdate == 0) {
      this.date = new Date().toISOString().slice(0, 10);
      this.formData = this.fb.group({
        startTime: [this.date,[Validators.required]],
        finishTime: [this.date,[Validators.required]],
      })
    }else {
      this.date = new Date().toISOString().slice(0, 7);
      this.formData = this.fb.group({
        startTime: [this.date,[Validators.required]],
        finishTime: [this.date,[Validators.required]],
      })
    }
    this.getRevenue();
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
  getRevenue(){
    const data:RevenueRequest = {
      optionUpdate: this.optionUpdate,
      startTime: this.formData.value.startTime,
      finishTime: this.formData.value.finishTime
    }
    this.revenueService.getRevenue(data).subscribe(res => {
      this.listOfData = res;
      res.forEach(o => {
        this.totalRevenue += o.totalPrice;
        this.totalShip += o.shippingFee;
      })
      this.totalOrder = res.length;
    })
  }
  handleSearch() {
    if (this.formData.valid) {
      this.getRevenue();
    } else {
      Object.values(this.formData.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
