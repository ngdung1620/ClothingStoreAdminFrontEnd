import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SizeServiceService} from "../../Services/size-service.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {EditSizeRequest, SizeResponse} from "../../Models/SizeModels";

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  formData!: FormGroup;
  formEdit!: FormGroup;
  listOfData!: any;
  isVisible = false;
  idSize!: string;
  constructor(private fb: FormBuilder,
              private sizeService: SizeServiceService,
              private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: ['', Validators.required]
    })
    this.getListSize()
  }
  getListSize(){
    this.sizeService.getListSize().subscribe(res => {
      this.listOfData = res;
    });
  }
  handleSubmit() {
    if (this.formData.valid) {
      this.sizeService.createSize(this.formData.value).subscribe(res => {
        this.notification.success("Thành công","Thêm kích thước thành công !");
        this.getListSize();
        this.formData.reset();
      }, error => {
        this.notification.error("Thất bại",error.name)
      });
    } else {
      Object.values(this.formData.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleClick(id: string) {
    if(confirm("Bạn chắc chắn muốn xóa không")){
      this.sizeService.deleteSize(id).subscribe(res => {
        this.notification.success("Thành công","Xóa kích thước thành công !");
        this.getListSize();
      });
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.formEdit.valid) {
      const data: EditSizeRequest = {
        id: this.idSize,
        name: this.formEdit.value.name
      }
      this.sizeService.editSize(data).subscribe(res => {
        this.notification.success("Thành công", "Chỉnh sửa thành công !");
        this.isVisible= false;
        this.getListSize();
      })
    } else {
      Object.values(this.formEdit.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleEdit(data: any) {
    this.isVisible = true;
    this.idSize = data.id;
    this.formEdit = this.fb.group({
      name: [data.name, Validators.required]
    })
  }
}
