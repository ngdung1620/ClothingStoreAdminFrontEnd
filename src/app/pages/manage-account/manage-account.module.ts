import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccountRoutingModule } from './manage-account-routing.module';
import { ManageAccountComponent } from './manage-account.component';
import { ListAccountComponent } from './component/list-account/list-account.component';
import { AddAccountComponent } from './component/add-account/add-account.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";
import { NzMessageModule } from 'ng-zorro-antd/message';
import {NzIconModule} from "ng-zorro-antd/icon";
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { EditAccountComponent } from './component/edit-account/edit-account.component';

@NgModule({
  declarations: [
    ManageAccountComponent,
    ListAccountComponent,
    AddAccountComponent,
    EditAccountComponent
  ],
    imports: [
        CommonModule,
        ManageAccountRoutingModule,
        NzTableModule,
        NzDividerModule,
        NzPaginationModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzButtonModule,
        NzDatePickerModule,
        NzSelectModule,
        NzMessageModule,
        NzIconModule,
        FormsModule,
        NzNotificationModule
    ]
})
export class ManageAccountModule { }
