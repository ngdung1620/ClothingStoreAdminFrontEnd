import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListAccountComponent} from "./component/list-account/list-account.component";
import {AddAccountComponent} from "./component/add-account/add-account.component";
import {EditAccountComponent} from "./component/edit-account/edit-account.component";

const routes: Routes = [
  {path:'', component: ListAccountComponent},
  {path:'list-account', component: ListAccountComponent},
  {path:'add-account', component: AddAccountComponent},
  {path:'edit-account', component: EditAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccountRoutingModule { }
