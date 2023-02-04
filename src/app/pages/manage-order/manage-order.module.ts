import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrderRoutingModule } from './manage-order-routing.module';
import { ManageOrderComponent } from './manage-order.component';
import { OrderApprovalComponent } from './component/order-approval/order-approval.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import {NzNotificationModule} from "ng-zorro-antd/notification";


@NgModule({
  declarations: [
    ManageOrderComponent,
    OrderApprovalComponent,
    OrderListComponent,
    OrderDetailComponent
  ],
    imports: [
        CommonModule,
        ManageOrderRoutingModule,
        NzTableModule,
        NzInputModule,
        NzSelectModule,
        NzButtonModule,
        NzIconModule,
        FormsModule,
        NzPaginationModule,
        NzNotificationModule
    ]
})
export class ManageOrderModule { }
