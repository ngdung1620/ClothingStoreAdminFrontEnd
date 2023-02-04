import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenueRoutingModule } from './revenue-routing.module';
import { RevenueComponent } from './revenue.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzTableModule} from "ng-zorro-antd/table";


@NgModule({
  declarations: [
    RevenueComponent
  ],
  imports: [
    CommonModule,
    RevenueRoutingModule,
    NzSelectModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzTableModule
  ]
})
export class RevenueModule { }
