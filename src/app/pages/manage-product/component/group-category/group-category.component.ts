import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GroupCategoryService} from "../../Services/group-category.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import { EditGroupCategoryRequest} from "../../Models/GroupCategory";

@Component({
  selector: 'app-group-category',
  templateUrl: './group-category.component.html',
  styleUrls: ['./group-category.component.scss']
})
export class GroupCategoryComponent implements OnInit {
  formData!: FormGroup;
  listOfData!: any;
  isVisible = false;
  formEdit!: FormGroup;
  idGroupCategory = '';

  constructor(private fb: FormBuilder,
              private groupCategoryService: GroupCategoryService,
              private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: [null, Validators.required]
    })
    this.getListGroupCategory();
  }
  getListGroupCategory() {
    this.groupCategoryService.getListGroupCategory().subscribe(res => {
      this.listOfData = res;
    });
  }
  handleSubmit() {
    if (this.formData.valid) {
      this.groupCategoryService.createGroupCategory(this.formData.value).subscribe(res => {
          this.notification.success("Thành công","Thêm nhóm danh mục thành công");
          this.getListGroupCategory();
          this.formData.reset();
      },error => {
        this.notification.error("Thất bại", error.name)
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

  handleEdit(data: any) {
    this.formEdit = this.fb.group({
      name: [data.name, Validators.required]
    })
    this.isVisible = true;
    this.idGroupCategory = data.id;
  }

  handleDelete(id: string) {
    if(confirm("Bạn chắc chắn muốn xóa ?")){
      this.groupCategoryService.deleteGroupCategory(id).subscribe(res => {
        this.notification.success("Thành công", "Xóa nhóm danh mục thành công");
        this.getListGroupCategory();
      },error => {
        this.notification.error("Thất bại", error.name)
      })
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.formEdit.valid) {
      const data: EditGroupCategoryRequest = {
        id: this.idGroupCategory,
        name: this.formEdit.value.name
      }
      this.groupCategoryService.editGroupCategory(data).subscribe(res => {
        this.notification.success("Thành công", "Cập nhập nhóm danh mục thành công !");
        this.isVisible = false;
        this.getListGroupCategory();
      }, error => {
        this.notification.error("Thất bại", error.name)
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
}
