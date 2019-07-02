import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { userService } from '../../../ShopService/user.service';
import { AuthService } from '../../../ShopService/auth-service';
import { ShopService } from '../../../ShopService/shop.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var jQuery: any;
declare var autosize: any;
declare var Ladda: any;
declare var Chartist: any;

@Component({
  selector: 'cat-page',
  templateUrl: './alpha.html'
})

export class DashboardsAlpha implements OnInit {
  meets;
  myMeetings;
  myHours;
  holidays;
  newHoliday;
  constructor(
    private authService: AuthService,
    private shopS: ShopService,
    private us: userService,
  ) {
  }

  deleteHoliday(key) {
    this.shopS.deleteHoliday(key);
  }

  onSubmit(data: any) {

    this.newHoliday = {
      name: data.name,
      date: data.date,
      fromHour: data.fromHour,
      untilDate: data.untilDate,
      untilHour: data.untilHour,
    }

    //console.log(this.newType);
    this.shopS.addHolidays(this.newHoliday);

  }




  ngOnInit() {
    console.log(this.us.user.fName);
    this.meets = this.shopS.getMeetType();
    this.myMeetings = this.shopS.getmyMeetings()
    this.holidays = this.shopS.getHolidays();
        var shopV = this.shopS;
  function updateWorkDays(key,from_value,to_value){
    shopV.updateWorkDays(key,from_value,to_value);
  }
  //  console.log(this.sunday.dayName)s;
  //  var timeEnd = this.shopS.WorkDays[0].timeEnd;
    //var timeStart = this.shopS.WorkDays[0].timeStart;
   function timeStart(day){
      return shopV.WorkDays[day].timeStart;
   }
   function timeEnd(day){
      return shopV.WorkDays[day].timeEnd;
   }



    $(function () {


      ///////////////////////////////////////////////////////////
      // jquery ui sortable
      $('#left-col, #right-col, #bottom-col').each(function () {
        $(this).sortable({
          // connect left and right containers
          connectWith: '.cat__core__sortable',
          tolerance: 'pointer',
          scroll: true,

          // set initial order from localStorage
          create: function () {

            var that = $(this),
              id = $(this).attr('id'),
              orderLs = localStorage.getItem('order-' + id);

            if (orderLs) {
              var order = orderLs.split(',');

              $.each(order, function (key, val) {
                var el = $('[order-id=' + val + ']');
                that.append(el);
              });
            }

          },

          // save order state on order update to localStorage
          update: function () {
            var orderArray = $(this).sortable('toArray', { attribute: 'order-id' }),
              prefix = $(this).attr('id');

            localStorage.setItem('order-' + prefix, orderArray);
          },

          // handler
          handle: ".card-header"
        });
      });

      ///////////////////////////////////////////////////////////
      // reset dashboard
      $('.reset-button').on('click', function () {
        localStorage.removeItem('order-left-col');
        localStorage.removeItem('order-right-col');
        localStorage.removeItem('order-bottom-col');
        setTimeout(function () {
          location.reload();
        }, 500)
      });
      ///////////////////////////////////////////////////////////
      // ladda buttons
      Ladda.bind('.ladda-button', { timeout: 2000 });

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

      $("#sunday").ionRangeSlider({
        type: "double",
        values: [
          "06:00", "06:30", "07:00",
          "07:30", "08:00", "08:30",
          "09:00", "09:30", "10:00", "10:30",
          "11:00", "11:30", "12:00", "12:30",
          "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30",
          "17:00", "17:30", "18:00", "18:30",
          "19:00", "19:30", "20:00", "20:30",
          "21:00", "21:30", "22:00", "22:30",
          "23:00", "23:30"
        ],
        from: 0,
        to: 10,
        onStart: function (data) {
          data.from = this.values.indexOf(timeStart(0));
          data.to = this.values.indexOf(timeEnd(0));
        },
        onFinish: function (data) {
          updateWorkDays("0",data.from_value,data.to_value)
        }
      });
      
      $("#monday").ionRangeSlider({
        type: "double",
        values: [
          "06:00", "06:30", "07:00",
          "07:30", "08:00", "08:30",
          "09:00", "09:30", "10:00", "10:30",
          "11:00", "11:30", "12:00", "12:30",
          "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30",
          "17:00", "17:30", "18:00", "18:30",
          "19:00", "19:30", "20:00", "20:30",
          "21:00", "21:30", "22:00", "22:30",
          "23:00", "23:30"
        ],
        from: 0,
        to: 10,
        onStart: function (data) {
          data.from = this.values.indexOf(timeStart(1));
          data.to = this.values.indexOf(timeEnd(1));
        },
        onFinish: function (data) {
          updateWorkDays("1",data.from_value,data.to_value)
        }
      });

      
      $("#tuesday").ionRangeSlider({
        type: "double",
        values: [
          "06:00", "06:30", "07:00",
          "07:30", "08:00", "08:30",
          "09:00", "09:30", "10:00", "10:30",
          "11:00", "11:30", "12:00", "12:30",
          "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30",
          "17:00", "17:30", "18:00", "18:30",
          "19:00", "19:30", "20:00", "20:30",
          "21:00", "21:30", "22:00", "22:30",
          "23:00", "23:30"
        ],
        from: 0,
        to: 10,
        onStart: function (data) {
          data.from = this.values.indexOf(timeStart(2));
          data.to = this.values.indexOf(timeEnd(2));
        },
        onFinish: function (data) {
          updateWorkDays("2",data.from_value,data.to_value)
        }
      });

      $("#wednesday").ionRangeSlider({
        type: "double",
        values: [
          "06:00", "06:30", "07:00",
          "07:30", "08:00", "08:30",
          "09:00", "09:30", "10:00", "10:30",
          "11:00", "11:30", "12:00", "12:30",
          "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30",
          "17:00", "17:30", "18:00", "18:30",
          "19:00", "19:30", "20:00", "20:30",
          "21:00", "21:30", "22:00", "22:30",
          "23:00", "23:30"
        ],
        from: 0,
        to: 10,
        onStart: function (data) {
          data.from = this.values.indexOf(timeStart(3));
          data.to = this.values.indexOf(timeEnd(3));
        },
        onFinish: function (data) {
          updateWorkDays("3",data.from_value,data.to_value)
        }
      });


      $("#thursday").ionRangeSlider({
        type: "double",
        values: [
          "06:00", "06:30", "07:00",
          "07:30", "08:00", "08:30",
          "09:00", "09:30", "10:00", "10:30",
          "11:00", "11:30", "12:00", "12:30",
          "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30",
          "17:00", "17:30", "18:00", "18:30",
          "19:00", "19:30", "20:00", "20:30",
          "21:00", "21:30", "22:00", "22:30",
          "23:00", "23:30"
        ],
        from: 0,
        to: 10,
        onStart: function (data) {
          data.from = this.values.indexOf(timeStart(4));
          data.to = this.values.indexOf(timeEnd(4));
        },
        onFinish: function (data) {
          updateWorkDays("4",data.from_value,data.to_value)
        }
      });


      $("#friday").ionRangeSlider({
        type: "double",
        values: [
          "06:00", "06:30", "07:00",
          "07:30", "08:00", "08:30",
          "09:00", "09:30", "10:00", "10:30",
          "11:00", "11:30", "12:00", "12:30",
          "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30",
          "17:00", "17:30", "18:00", "18:30",
          "19:00", "19:30", "20:00", "20:30",
          "21:00", "21:30", "22:00", "22:30",
          "23:00", "23:30"
        ],
        from: 0,
        to: 10,
        onStart: function (data) {
          data.from = this.values.indexOf(timeStart(5));
          data.to = this.values.indexOf(timeEnd(5));
        },
        onFinish: function (data) {
          updateWorkDays("5",data.from_value,data.to_value)
        }
      });


      $("#saturday").ionRangeSlider({
        type: "double",
        values: [
          "06:00", "06:30", "07:00",
          "07:30", "08:00", "08:30",
          "09:00", "09:30", "10:00", "10:30",
          "11:00", "11:30", "12:00", "12:30",
          "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30",
          "17:00", "17:30", "18:00", "18:30",
          "19:00", "19:30", "20:00", "20:30",
          "21:00", "21:30", "22:00", "22:30",
          "23:00", "23:30"
        ],
        from: 0,
        to: 10,
        onStart: function (data) {
          data.from = this.values.indexOf(timeStart(6));
          data.to = this.values.indexOf(timeEnd(6));
        },
        onFinish: function (data) {
          updateWorkDays("6",data.from_value,data.to_value)
        }
      });


    });

  }
}

