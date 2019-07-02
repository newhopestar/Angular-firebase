import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from '@angular/fire/auth';
import { userService } from '../ShopService/user.service'


@Injectable()
export class AuthService {
  isLogin = false;
  constructor(private afAuth: AngularFireAuth, private us: userService) {
    // console.log('Hello AuthService Provider');
  }
  login(email, password) {
    this.isLogin = true;
    return this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    )
  }
  logout() {
    this.isLogin = false;
    return this.afAuth.auth.signOut();
  }


}
