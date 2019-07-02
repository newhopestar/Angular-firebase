import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { userService } from '../../../ShopService/user.service';
import { AuthService } from '../../../ShopService/auth-service';
import { ShopService } from '../../../ShopService/shop.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
// import { RouterModule, Routes } from '@angular/router';
//import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'cat-page',
  templateUrl: './meetType.html',
})



export class meetType implements OnInit {
  gender = null;
  float = false;
  approve = false;
  //  @Input() gender;
  meets;
  myMeetings;
  myHours;
  newType;
  constructor(
    private authService: AuthService,
    private shopS: ShopService,
    private us: userService,
    // private af: AngularFire,
  ) {
  }

  deleteMeetTypeInner(key) {
    this.shopS.deleteMeetType(key);
  }

  onSubmit(data: any) {
    if (data.approve == "") {
      data.approve = false;
    }
    if (data.float == "") {
      data.float = false;
    }
    this.newType = {
      name: data.name,
      approve: data.approve,
      float: data.float,
      gender: data.gender,
      info: data.info,
      meetTime: data.meetTime,
      pic: data.pic,
      price: data.price,
      reminder: data.reminder
    }

    //console.log(this.newType);
    this.shopS.addMeetingsType(this.newType);

  }

  ngOnInit() {
    console.log(this.us.user.fName);
    this.meets = this.shopS.getMeetType();
    this.newType = {
      approve: true,
      float: false,
      gender: "maddhle",
      info: "ccccddccc",
      meetTime: "60",
      name: "bladdddddd bla",
      pic: "looddddo.png",
      price: "55ddd",
      reminder: "15"
    }
    //   this.shopS.addMeetingsType(this.newType); 

    $(function () {

      $('.cat__ecommerce__catalog__item__like').on('click', function () {
        $(this).toggleClass('cat__ecommerce__catalog__item__like--selected')
      });

    });

  }
}

