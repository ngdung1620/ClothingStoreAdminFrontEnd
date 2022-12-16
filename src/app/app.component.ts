import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login/services/login.service";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private loginService: LoginService,
              private permissionService: NgxPermissionsService) {
  }
  ngOnInit(): void {
    if(sessionStorage.getItem('token') != null){
      const tokenObj = this.loginService.token();
      const claims = tokenObj['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.permissionService.loadPermissions(claims);
    }

  }

}
