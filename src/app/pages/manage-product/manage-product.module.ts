import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductRoutingModule } from './manage-product-routing.module';
import { ManageProductComponent } from './manage-product.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductAddComponent } from './component/product-add/product-add.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import { CategoryProductComponent } from './component/category-product/category-product.component';
import { GroupCategoryComponent } from './component/group-category/group-category.component';
import { SizeComponent } from './component/size/size.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import {NzModalModule} from "ng-zorro-antd/modal";
import { ProductEditComponent } from './component/product-edit/product-edit.component';

@NgModule({
  declarations: [
    ManageProductComponent,
    ProductListComponent,
    ProductAddComponent,
    CategoryProductComponent,
    GroupCategoryComponent,
    SizeComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    ManageProductRoutingModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzUploadModule,
    NzIconModule,
    NzMessageModule,
    NzButtonModule,
    NzTableModule,
    NzPaginationModule,
    NzNotificationModule,
    NzModalModule
  ]
})
export class ManageProductModule { }
