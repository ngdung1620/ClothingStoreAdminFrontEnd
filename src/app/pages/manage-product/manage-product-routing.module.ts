import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./component/product-list/product-list.component";
import {ProductAddComponent} from "./component/product-add/product-add.component";
import {CategoryProductComponent} from "./component/category-product/category-product.component";
import {GroupCategoryComponent} from "./component/group-category/group-category.component";
import {SizeComponent} from "./component/size/size.component";
import {ProductEditComponent} from "./component/product-edit/product-edit.component";

const routes: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'product-list', component: ProductListComponent},
  { path: 'product-add', component: ProductAddComponent},
  { path: 'product-category', component: CategoryProductComponent},
  { path: 'group-category', component: GroupCategoryComponent},
  { path: 'size', component: SizeComponent},
  {path: 'product-edit',component: ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductRoutingModule { }
