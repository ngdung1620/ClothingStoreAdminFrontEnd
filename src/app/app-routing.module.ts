import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnauthorizedComponent} from "./core/component/unauthorized/unauthorized.component";
import {AuthenticationGuard} from "./core/authentication.guard";
import {NgxPermissionsGuard} from "ngx-permissions";
import {NotFoundComponent} from "./core/component/not-found/not-found.component";
import {LoginGuard} from "./core/login.guard";

const routes: Routes = [
  {
    path: "unauthorized", component: UnauthorizedComponent
  },
  {
    path: '',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
    canActivate: [AuthenticationGuard, NgxPermissionsGuard],
    data: {
      permissions: {
        only: ["Administration"],
        redirectTo: '/unauthorized'
      }
    },
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path:'**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
