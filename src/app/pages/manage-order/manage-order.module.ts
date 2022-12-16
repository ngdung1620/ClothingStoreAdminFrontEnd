import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrderRoutingModule } from './manage-order-routing.module';
import { ManageOrderComponent } from './manage-order.component';
import { OrderApprovalComponent } from './component/order-approval/order-approval.component';
import { OrderListComponent } from './component/order-list/order-list.component';


@NgModule({
  declarations: [
    ManageOrderComponent,
    OrderApprovalComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    ManageOrderRoutingModule
  ]
})
export class ManageOrderModule { }
