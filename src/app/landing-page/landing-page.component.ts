import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/services/login.service";
import {NgxPermissionsService} from "ngx-permissions";
import {Router} from "@angular/router";
import {LandingPageService} from "./services/landing-page.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  isCollapsed = false;
  userName = '';
  constructor(private loginService: LoginService,
              private permissionService: NgxPermissionsService,
              private route: Router,
              private landingPageService: LandingPageService) { }

  ngOnInit(): void {
    const tokenObj = this.loginService.token();
    const claims = tokenObj['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.permissionService.loadPermissions(claims);
    this.landingPageService.getUser(tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']).subscribe(res => {
      this.userName = res.fullName
    })

  }

  handleLogout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['login']);
    window.location.reload();
  }
}
