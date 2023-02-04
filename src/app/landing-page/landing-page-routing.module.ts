import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page.component";

const routes: Routes = [
  {
    path: '' ,component: LandingPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/welcome' },
      { path: 'welcome', loadChildren: () => import('../pages/welcome/welcome.module').then(m => m.WelcomeModule)},
      { path: 'manage-account',loadChildren: () => import('../pages/manage-account/manage-account.module').then(m => m.ManageAccountModule)},
      { path: 'manage-product', loadChildren: () => import('../pages/manage-product/manage-product.module').then(m => m.ManageProductModule)},
      { path: 'manage-order', loadChildren: () => import('../pages/manage-order/manage-order.module').then(m => m.ManageOrderModule)},
      { path: 'revenue', loadChildren: () => import('../revenue/revenue.module').then(m => m.RevenueModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
