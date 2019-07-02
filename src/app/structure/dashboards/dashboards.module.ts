import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AuthService} from '../../../ShopService/auth-service'
import { AuthGuard} from '../../../ShopService/auth-guard.service'

import { DashboardsAlpha } from './alpha.page';
import { DashboardsBeta } from './beta.page';

export const routes: Routes = [
  { path: 'alpha', component: DashboardsAlpha, canActivate: [AuthGuard] },
  { path: 'dashboards/beta', component: DashboardsBeta },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardsAlpha,
    DashboardsBeta
  ],
  providers: [
    AuthService,
    AuthGuard
  ]

})

export class DashboardsModule { }
