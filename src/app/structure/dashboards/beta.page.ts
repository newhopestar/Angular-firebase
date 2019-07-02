import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { userService } from '../../../ShopService/user.service';
import { AuthService } from '../../../ShopService/auth-service';
import { ShopService } from '../../../ShopService/shop.service';
import { NgModule } from '@angular/core';
import { AngularFireAuth, } from '@angular/fire/auth';
import { RouterModule, Routes } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var jQuery: any;
declare var autosize: any;
declare var Ladda: any;
declare var Chartist: any;

@Component({
  selector: 'cat-page',
  templateUrl: './beta.html'
})



export class DashboardsBeta implements OnInit {

  constructor(
    private authService: AuthService,
    private shopS: ShopService,
    private us: userService,
    private af: AngularFireAuth,
  ) {
  }


  ngOnInit() {
    this.af.authState.subscribe(authState => { });

    $(function () {
      console.log("itemmmmm  " + this.us.user);


      ///////////////////////////////////////////////////////////
      // tooltips
      $("[data-toggle=tooltip]").tooltip();

      ///////////////////////////////////////////////////////////
      // chart1
      new Chartist.Line(".chart-line", {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        series: [
          [5, 0, 7, 8, 12],
          [2, 1, 3.5, 7, 3],
          [1, 3, 4, 5, 6]
        ]
      }, {
          fullWidth: !0,
          chartPadding: {
            right: 40
          },
          plugins: [
            Chartist.plugins.tooltip()
          ]
        });

      ///////////////////////////////////////////////////////////
      // chart 2
      var overlappingData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        series: [
          [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
          [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
        ]
      },
        overlappingOptions = {
          seriesBarDistance: 10,
          plugins: [
            Chartist.plugins.tooltip()
          ]
        },
        overlappingResponsiveOptions = [
          ["", {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ];

      new Chartist.Bar(".chart-overlapping-bar", overlappingData, overlappingOptions, overlappingResponsiveOptions);

      ///////////////////////////////////////////////////////////
      // custom scroll
      if (!('ontouchstart' in document.documentElement) && jQuery().jScrollPane) {
        $('.custom-scroll').each(function () {
          $(this).jScrollPane({
            contentWidth: '100%',
            autoReinitialise: true,
            autoReinitialiseDelay: 100
          });
          var api = $(this).data('jsp'),
            throttleTimeout;
          $(window).bind('resize', function () {
            if (!throttleTimeout) {
              throttleTimeout = setTimeout(function () {
                api.reinitialise();
                throttleTimeout = null;
              }, 50);
            }
          });
        });
      }

    });

  }
}


