/**
 * Created by jonrowe on 02/02/2017.
 */

import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import {UniversalAuth} from './universalAuth.service';
// import { Auth }      from './auth.service';
 import { Location } from '@angular/common';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: UniversalAuth, private router: Router, private location: Location) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    // return this.checkLogin(url);
    return true;
  }

  checkLogin(url: string): boolean {
    if (this.authService.isAuthenticated()){
      return true;
    }
    this.authService.login();
    // this.router.navigateByUrl('/login');
    // return true;
  }

  locationHasAccessToken():boolean
  {
    // return true;
    return location.href.indexOf('access_token') > -1;
  }
}
