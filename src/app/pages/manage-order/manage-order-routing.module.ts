import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderApprovalComponent} from "./component/order-approval/order-approval.component";
import {OrderListComponent} from "./component/order-list/order-list.component";

const routes: Routes = [
  { path: '', component: OrderListComponent},
  { path: 'order-list', component: OrderListComponent},
  { path: 'order-approval', component: OrderApprovalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrderRoutingModule { }
