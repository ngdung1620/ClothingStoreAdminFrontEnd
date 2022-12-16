import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../Services/product.service";
import {SizeServiceService} from "../../Services/size-service.service";
import {CategoryService} from "../../Services/category.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {ProductResponse} from "../../Models/ProductModels";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  loading = false;
  form!: FormGroup;
  imgFile: File | '' = '';
  listOfOptionSize: any;
  listOfOptionCategory: any;
  imageSrc: any = '';
  idProduct!: string;
  data!: ProductResponse;
  isLog = false;

  constructor( private fb: FormBuilder,
               private productService: ProductService,
               private sizeService: SizeServiceService,
               private categoryService: CategoryService,
               private notification: NzNotificationService,
               private route: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      categoryId: [null,Validators.required],
      sizes: [[],Validators.required],
      price: [null, Validators.required],
      total: [null, Validators.required],
      description: [' ', Validators.required]
    })
    this.productService.idProduct$.subscribe(id => {
     this.idProduct = id;
    });
    if(this.idProduct == ''){
      this.route.navigate(['manage-product/product-list']);
    }else {
      this.getDataForm();
      this.getListCategory();
      this.getListSize();
    }
  }
  getDataForm() {
    this.productService.getProduct(this.idProduct).subscribe(res => {
      let sizes:any = [];
      res.listSizes.sort((a,b) => { return a.name - b.name}).forEach((s) => sizes.push(s.id));
      this.form.controls['sizes'].setValue(sizes);
      this.form.controls['name'].setValue(res.name);
      this.form.controls['categoryId'].setValue(res.categoryId);
      this.form.controls['price'].setValue(res.price);
      this.form.controls['total'].setValue(res.total);
      this.form.controls['description'].setValue(res.description);
      this.imageSrc = res.img;
    });
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
    if(event.target.files){
      this.isLog = false;
    }
    if (event.target.files && event.target.files[0]) {
      this. imgFile = event.target.files[0] as File;
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    } else {
      this.imageSrc = '';
      this.isLog = true;
      this.imgFile = '';
    }
  }

  submitForm() {
    if (this.form.valid && this.imageSrc != '') {
      const formData = new FormData();
      this.productService.idProduct$.subscribe(id => {
        formData.append("id",id);
      });
      formData.append("name",this.form.value.name);
      formData.append("price",this.form.value.price);
      formData.append("description",this.form.value.description);
      formData.append("total",this.form.value.total);
      formData.append("imgFile",this.imgFile);
      formData.append("categoryId",this.form.value.categoryId);
      for(let i = 0; i < this.form.value.sizes.length;i++){
        formData.append("sizes",this.form.value.sizes[i]);
      }
      this.productService.editProduct(formData).subscribe(res => {
        this.notification.success("Thành công", "Cập nhật sản phẩm thành công");
        this.route.navigate(['manage-product/product-list'])
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
