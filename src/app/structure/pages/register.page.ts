import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database'; 
import { NgModule } from '@angular/core';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'cat-page',
  templateUrl: './register.html'
})

export class PagesRegister implements OnInit {
  @Input() todo = {
    email: "",
    pass: "123456777"
  }

  form: FormGroup;
  myGroup: FormGroup;
  lengthUserId;
  userRef;


  constructor(
    fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) {

    this.myGroup = new FormGroup({

    });
  }
  register() {

    this.afAuth.auth.createUserWithEmailAndPassword(
       this.todo.email,
       this.todo.pass,
    ).then(authState => {
      authState.user.sendEmailVerification();
      this.lengthUserId = authState.user.uid;

      this.userRef = this.afDb.object('/Users/' + this.lengthUserId);
      if (this.lengthUserId) {
        this.userRef.set(this.todo);
      }


    }).catch(error => console.log("error", error))





    //  console.log(this.todo)
  }
  ngOnInit() {

    $(function () {

      // Form Validation
      $('#form-validation').validate({
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

      // Switch to fullscreen
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
      })

    });

  }
}

