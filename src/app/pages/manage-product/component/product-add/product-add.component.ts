import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../Services/product.service";
import {SizeServiceService} from "../../Services/size-service.service";
import {CategoryService} from "../../Services/category.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  loading = false;
  form!: FormGroup;
  imgFile!: File;
  listOfOptionSize: any;
  listOfOptionCategory: any;
  imageSrc: any = '';

  constructor( private fb: FormBuilder,
               private productService: ProductService,
               private sizeService: SizeServiceService,
               private categoryService: CategoryService,
               private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      categoryId: [null,Validators.required],
      sizes: [[],Validators.required],
      price: [null, Validators.required],
      total: [null, Validators.required],
      description: [' ', Validators.required],
      file:[null,Validators.required]
    })
    this.getListCategory();
    this.getListSize();
  }

  getListSize(){
    this.sizeService.getListSize().subscribe(res => {
      this.listOfOptionSize = res;
    })
  }
  getListCategory() {
    this.categoryService.getListCategory().subscribe(res => {
      this.listOfOptionCategory = res;
    })
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      this. imgFile = event.target.files[0] as File;
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    } else {
      this.imageSrc = '';
    }
  }

  submitForm() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append("name",this.form.value.name);
      formData.append("price",this.form.value.price);
      formData.append("description",this.form.value.description);
      formData.append("total",this.form.value.total);
      formData.append("imgFile",this.imgFile);
      formData.append("categoryId",this.form.value.categoryId);
      for(let i = 0; i < this.form.value.sizes.length;i++){
        formData.append("sizes",this.form.value.sizes[i]);
      }
      this.productService.createProduct(formData).subscribe(res => {
        this.notification.success("Thành công", "Thêm sản phẩm thành công");
        this.form.reset();
        this.imageSrc = '';
      }, error => {
        this.notification.error("Thất bại",error.name);
      })

    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
