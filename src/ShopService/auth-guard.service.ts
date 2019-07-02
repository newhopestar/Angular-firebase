import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

//import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { userService } from '../ShopService/user.service'
import { AuthService } from '../ShopService/auth-service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {

  }
  canActivate() {
    if (this._authService.isLogin)
      return true;

    this._router.navigate(['login'])
    return false;
  }

}
