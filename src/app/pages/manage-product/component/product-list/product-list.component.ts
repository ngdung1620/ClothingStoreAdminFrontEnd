import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../Services/product.service";
import {ListProductRequest, ProductResponse} from "../../Models/ProductModels";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  listOfData: any = [];
  pageIndex = 1;
  total!: number;
  search = "";
  pageSize = 5;
  isVisible = false;
  form: any;
  constructor(private productService: ProductService,
              private notification: NzNotificationService,
              private route: Router) { }

  ngOnInit(): void {
    this.getListProduct(this.pageIndex);
  }

  getListProduct(pageIndex: number) {
    const data: ListProductRequest = {
      search: this.search,
      pageSize: this.pageSize,
      pageIndex: pageIndex
    }
    this.productService.listProduct(data).subscribe(res => {
      this.listOfData = res.products
      this.total = res.totalRecords
      this.pageSize = res.pageSize
    })
  }
  handleChange($event: number) {
    this.getListProduct($event);
  }

  handleEdit(data: any) {
    this.productService._idProductSubject.next(data.id);
    this.route.navigate(['manage-product/product-edit']);
  }

  handleDelete(id: string) {
    if(confirm("Bạn chắc chắn muốn xóa")){
      this.productService.deleteProduct(id).subscribe(res => {
        this.notification.success("Thành công","Xóa sản phẩm thành công");
        this.getListProduct(this.pageIndex);
      },error => {
        this.notification.error("Thật bại",error.name);
      })
    }
  }

  handleSearch() {
    this.getListProduct(1);
  }

}
