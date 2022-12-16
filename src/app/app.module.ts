import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NgxPermissionsModule} from "ngx-permissions";
import {JwtModule} from "@auth0/angular-jwt";
import {UnauthorizedComponent} from "./core/component/unauthorized/unauthorized.component";
import {NotFoundComponent} from "./core/component/not-found/not-found.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NgxPermissionsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem("token");
        },
      },
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
