import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { userService } from '../../../ShopService/user.service';
import { AuthService } from '../../../ShopService/auth-service';
import { ShopService } from '../../../ShopService/shop.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'cat-page',
  templateUrl: './products-list.html'
})

export class EcommerceProductsList implements OnInit {

  constructor(
    private authService: AuthService,
    private shopS: ShopService,
    private us: userService,
    // private af: AngularFire,
  ) {
  }
       downloadARR(key){
         console.log(key);
       }


  ngOnInit() {
      var data2 = []
      this.shopS.getUsers().valueChanges()
        .subscribe(
        snapshots => {
          // snapshots.forEach(snapshot => {
          //   var myARR = [];
          //   myARR.push("<img style='width:100px; border-radius: 100%;' class='users-ProfilePic' src='" + snapshot.val().ProfilePic + "'/>");
          //   myARR.push(snapshot.val().fname);
          //   myARR.push(snapshot.val().lname);
          //   myARR.push(snapshot.val().phone);
          //   myARR.push(snapshot.val().Birthday);
          //   myARR.push(snapshot.val().gender);
          //   myARR.push(snapshot.val().numOrders);
          //   myARR.push(snapshot.val().lastOrder.name + snapshot.val().lastOrder.date);
          //   myARR.push("<button (click)='downloadARR("+snapshot.key+")' value='click'/click></button>");
          //   console.log();
            
          //   data2.push(myARR)
          // })
          console.log('snapshots',snapshots)
        })

    $(function () {
      // Datatables
      $('#example1').DataTable({
        "lengthMenu": [[50, 100, 200, -1], [50, 100, 200, "All"]],
        responsive: true,
        "autoWidth": false,
        data: data2
      });

    })

  }
}

