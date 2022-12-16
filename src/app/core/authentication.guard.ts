import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,
              private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem("token") == null) {
      this.route.navigate(["/login"]);
      return false;
    }

    const token = sessionStorage.getItem("token");
    // @ts-ignore
    if(this.jwtHelper.isTokenExpired(token)) {
      this.route.navigate(["/login"]);
      return false;
    }
    return true;
  }

}
