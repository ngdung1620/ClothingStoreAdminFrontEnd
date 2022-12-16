import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {ListUserRequest} from "../../models/accountModels";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {
  listOfData: any;
  pageIndex = 1;
  pageTotal!: number;
  pageSize = 5;
  search = '';
  constructor(private accountService: AccountService,
              private notification: NzNotificationService,
              private rote: Router) { }

  ngOnInit(): void {
    this.getListUser(this.pageIndex);
  }
  getListUser(pageIndex: number) {
    const data: ListUserRequest = {
      search: this.search,
      pageSize: this.pageSize,
      pageIndex: pageIndex
    }
    this.accountService.getListUser(data).subscribe(res => {
      this.listOfData = res.users;
      this.pageTotal = res.totalRecords
    })
  }
  handleChange($event: number) {
    this.getListUser($event)
  }

  handleSearch() {
    this.getListUser(this.pageIndex);
  }

  handleEdit(data: any) {
    this.accountService.idUserSubject.next(data.userId);
    this.rote.navigate(['/manage-account/edit-account'])
  }

  handleDelete(id: string) {
      if(confirm("Bạn có chắc chắn muốn xóa")){
        this.accountService.deleteUser(id).subscribe(res => {
          this.notification.success("Thành công","Xóa thành công");
          this.getListUser(this.pageIndex);
        },error => {
          this.notification.error("Thất bại",error.name);
        })
      }
  }
}
