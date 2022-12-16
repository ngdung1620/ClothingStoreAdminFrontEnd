import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../Services/category.service";
import {GroupCategoryResponse} from "../../Models/GroupCategory";
import {GroupCategoryService} from "../../Services/group-category.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CategoryResponse} from "../../Models/CategoryModels";

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss']
})
export class CategoryProductComponent implements OnInit {

  listOfData !: any;
  formData!: FormGroup;
  listGroupCategory!: any;
  isVisible = false;
  formEdit!: FormGroup;
  idCategory = '';
  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private groupCategoryService: GroupCategoryService,
              private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: [null, Validators.required],
      groupCategoryId: [null, Validators.required]
    })
    this.getListCategory();
    this.getListGroupCategory();
  }
  getListGroupCategory() {
    this.groupCategoryService.getListGroupCategory().subscribe(res => {
      this.listGroupCategory = res;
    })
  }
  getListCategory() {
    this.categoryService.getListCategory().subscribe(res => {
      this.listOfData = res;
    })
  }
  handleSubmit() {
    if (this.formData.valid) {
     this.categoryService.createCategory(this.formData.value).subscribe(res => {
       this.notification.success("Thành công", "Thêm danh mục thành công");
       this.formData.reset();
       this.getListCategory();
     }, error => {
       this.notification.error("Thất bại",error.name);
     })
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
    this.isVisible = true;
    this.idCategory = data.id;
    this.formEdit = this.fb.group({
      name: [data.name, Validators.required],
      groupCategoryId: [data.groupCategoryId, Validators.required]
    })
  }

  handleDelete(id: string) {
    if(confirm("Bạn có chắc chắn muốn xóa danh mục")){
      this.categoryService.deleteCategory(id).subscribe(res => {
        this.notification.success("Thành công", "Xóa danh mục thành công");
        this.getListCategory();
      })
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.formEdit.valid) {
      const data: CategoryResponse = {
        id: this.idCategory,
        name: this.formEdit.value.name,
        groupCategoryId: this.formEdit.value.groupCategoryId
      }
      this.categoryService.editCategory(data).subscribe(res => {
        this.notification.success("Thành công", "Cập nhập danh mục thành công");
        this.getListCategory();
        this.isVisible = false;
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
