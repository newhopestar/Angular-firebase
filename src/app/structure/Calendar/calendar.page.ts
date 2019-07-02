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
  templateUrl: './calendar.html'
})

export class Calendar implements OnInit {

  constructor(
    private authService: AuthService,
    private shopS: ShopService,
    private us: userService,
  ) {
  }



  ngOnInit() {

    $(function() {

      ///////////////////////////////////////////////////
      // FULL CALENDAR
      $('.cat__apps__calendar').fullCalendar({
        defaultView: 'agendaWeek',
        maxTime: "23:00:00",
        minTime: "07:00:00",
          height: '100%',
          locale: 'he',
        header: {
          left: 'prev, next',
          center: 'title',
          right: 'month, agendaWeek, agendaDay'
        },
        buttonIcons: {
          prev: 'none fa fa-arrow-left',
          next: 'none fa fa-arrow-right',
          prevYear: 'none fa fa-arrow-left',
          nextYear: 'none fa fa-arrow-right'
        },
        businessHours: [ // specify an array instead
         {
        dow: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
        start: '08:00', // 8am
        end: '18:00' // 6pm
         },
        {
        dow: [ 4, 5 ], // Thursday, Friday
        start: '10:00', // 10am
        end: '16:00' // 4pm
        }
        ],
        defaultDate: '2016-05-12',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        viewRender: function(view, element) {
          if (!('ontouchstart' in document.documentElement) && jQuery().jScrollPane) {
            $('.fc-scroller').jScrollPane({
              autoReinitialise: true,
              autoReinitialiseDelay: 100
            });
          }
        },
        events: [
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-05-09T16:00:00',
            className: 'fc-event-default'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-05-16T16:00:00',
            className: 'fc-event-success'
          },
          {
            title: 'Conference',
            start: '2016-05-12T14:30:00',
            end: '2016-05-12T18:30:00',
            className: 'fc-event-danger'
          },
          {
            title: 'Meeting',
            start: '2016-05-12T10:30:00',
            end: '2016-05-12T12:30:00',
            className: 'fc-event-default'
          },
          {
            title: 'Lunch',
            start: '2016-05-12T12:00:00',
            className: 'fc-event-default'
          },
          {
            title: 'Meeting',
            start: '2016-05-12T14:30:00',
            className: 'fc-event-info'
          },
          {
            title: 'Happy Hour',
            start: '2016-05-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2016-05-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2016-05-13T07:00:00',
            className: 'fc-event-danger'
          },
          {
            title: 'Click for Google',
            url: 'javascript: alert("Clicked: External URL");',
            start: '2016-05-28',
            className: 'fc-event-warning'
          }
        ],
        eventClick: function(calEvent, jsEvent, view) {
          if (!$(this).hasClass('event-clicked')) {
            $('.fc-event').removeClass('event-clicked');
            $(this).addClass('event-clicked');
          }
        }
      });



      $('.cat__apps__calendar2').fullCalendar({
        defaultView: 'listDay',
        height: 500,
        locale: 'he',
        header: false,
        buttonIcons: {
          prev: 'none',
          next: 'none ',
          prevYear: '',
          nextYear: ''
        },
        businessHours: [ // specify an array instead
         {
        dow: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
        start: '08:00', // 8am
        end: '18:00' // 6pm
         },
        {
        dow: [ 4, 5 ], // Thursday, Friday
        start: '10:00', // 10am
        end: '16:00' // 4pm
        }
        ],
        defaultDate: '2016-05-12',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        viewRender: function(view, element) {
          if (!('ontouchstart' in document.documentElement) && jQuery().jScrollPane) {
            $('.fc-scroller').jScrollPane({
              autoReinitialise: true,
              autoReinitialiseDelay: 100
            });
          }
        },
        events: [
          {
            title: 'All Day Event',
            start: '2016-05-01',
            className: 'fc-event-success'
          },
          {
            title: 'Long Event',
            start: '2016-05-07',
            end: '2016-05-10'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-05-09T16:00:00',
            className: 'fc-event-default'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-05-16T16:00:00',
            className: 'fc-event-success'
          },
          {
            title: 'Conference',
            start: '2016-05-11',
            end: '2016-05-13',
            className: 'fc-event-danger'
          },
          {
            title: 'Meeting',
            start: '2016-05-12T10:30:00',
            end: '2016-05-12T12:30:00',
            className: 'fc-event-default'
          },
          {
            title: 'Lunch',
            start: '2016-05-12T12:00:00',
            className: 'fc-event-default'
          },
          {
            title: 'Meeting',
            start: '2016-05-12T14:30:00',
            className: 'fc-event-info'
          },
          {
            title: 'Happy Hour',
            start: '2016-05-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2016-05-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2016-05-13T07:00:00',
            className: 'fc-event-danger'
          },
          {
            title: 'Click for Google',
            url: 'javascript: alert("Clicked: External URL");',
            start: '2016-05-28',
            className: 'fc-event-warning'
          }
        ],
        eventClick: function(calEvent, jsEvent, view) {
          if (!$(this).hasClass('event-clicked')) {
            $('.fc-event').removeClass('event-clicked');
            $(this).addClass('event-clicked');
          }
        }
      });



    });

  }
}

