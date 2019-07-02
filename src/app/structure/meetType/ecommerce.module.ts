import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { meetType } from './meetType.page';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';


export const routes: Routes = [
  { path: 'meetType', component: meetType },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    meetType,
  ]

})

export class meetTypeModule { }
