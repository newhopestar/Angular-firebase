import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { userService } from '../../../ShopService/user.service';
import { AuthService } from '../../../ShopService/auth-service';
import { ShopService } from '../../../ShopService/shop.service';
import { NgModule } from '@angular/core';
import { AngularFireDatabase, } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth'
import { RouterModule, Routes } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardsAlpha } from '../dashboards/alpha.page';



declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'cat-page',
  templateUrl: './login-beta.html'


})

export class PagesLoginBeta implements OnInit {
  shopUser;
  shopSub;
  barberID;
  myGroup: FormGroup;
  email = "haimchernin@gmail.com";
  password = "123456777";


  constructor(
    private authService: AuthService,
    private shopS: ShopService,
    private us: userService,
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private _route: Router
  ) {
  }


  ToLogin(data: any) {
    //  this.email = data.email;
    // this.password = data.password;
    if ((this.email) && (this.password)) {
      this.authService.login(this.email, this.password)
        .then(authState => {
          console.log(authState.user)
          this.shopUser = this.afDb.object('/Users/' + authState.user.uid).valueChanges()
            .subscribe(m => {
              console.log("login power", m)
              this.us.saveUserData(m);
              console.log(this.us.user);
              if (true) {
                // this.shopS.getSetting(this.us.user.shopOwnerID).subscribe(value => {
                //   console.log('logo test', value);
                // })
                this.shopSub = this.shopS.getShopDetils(this.us.user.shopOwnerID).valueChanges()
                  .subscribe(shopD => {
                    this.shopS.saveShopDetils(shopD)
                    // this.shopS.saveShopDetilsTopBar(shopD.Setting)
                    this._route.navigate(['alpha']);
                  })

              }
              else
                console.log("not an admin");
            })
        }).catch(error => console.log("error !!!!!!!!!!!!!!", error))



    }
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(authState => { });
    console.log(this.us.user);

    $(function () {

      // Form Validation
      $('.form-validation').validate({
        submit: {
          settings: {
            inputContainer: '.form-group',
            errorListClass: 'form-control-error',
            errorClass: 'has-danger'
          }
        }
      });

      // Show/Hide Password
      $('.password').password({
        eyeClass: '',
        eyeOpenClass: 'icmn-eye',
        eyeCloseClass: 'icmn-eye-blocked'
      });

      /* Switch to fullscreen
      $('.switch-to-fullscreen').on('click', function () {
        $('.cat__pages__login').toggleClass('cat__pages__login--fullscreen');
      })

      // Change BG
      $('.random-bg-image').on('click', function () {
        var min = 1, max = 5,
          next = Math.floor($('.random-bg-image').data('img')) + 1,
          final = next > max ? min : next;

        $('.random-bg-image').data('img', final);
        $('.cat__pages__login').data('img', final).css('backgroundImage', 'url(/assets/modules/pages/img/login/' + final + '.jpg)');
      })*/

    });

  }
}

