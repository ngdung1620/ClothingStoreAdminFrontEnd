import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "./services/login.service";
import {Login} from "./models/login";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {NgxPermissionsService} from "ngx-permissions";
import {LandingPageService} from "../landing-page/services/landing-page.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dataForm = this.fb.group({
    email: ['',[Validators.email,Validators.required]],
    password: ['',Validators.required]
  })
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notification: NzNotificationService,
              private route: Router,
              private permissionService: NgxPermissionsService,
              private landingPageService: LandingPageService) {
  }

  ngOnInit(): void {
  }

  handleSubmit() {
   if(this.dataForm.valid){
      this.loginService.login(this.dataForm.value as Login).subscribe(res => {
        if(res.status == -1){
          this.notification.error("Lỗi",res.message)
        }
        if(res.status == 1){
          sessionStorage.setItem("token",res.token);
          this.route.navigate(['']);
          const tokenObj = this.loginService.token();
          const claims = tokenObj['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          this.permissionService.loadPermissions(claims);

        }
      })
   }else {
     Object.values(this.dataForm.controls).forEach(control => {
       if (control.invalid) {
         control.markAsDirty();
         control.updateValueAndValidity({ onlySelf: true });
       }
     });
   }
  }
}
