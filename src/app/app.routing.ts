import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardsAlpha } from './structure/dashboards/alpha.page';
import { AuthGuard } from '../ShopService/auth-guard.service';
import { PagesLoginBeta } from './structure/pages/login-beta.page';
import { meetType } from './structure/meetType/meetType.page';
import { AppsCalendar } from './structure/apps/calendar.page';
import { EcommerceProductsList } from './structure/ecommerce/products-list.page';


export const routes: Routes = [
  { path: '', redirectTo: 'alpha', pathMatch: 'full' },
  { path: 'login', component: PagesLoginBeta },
  { path: 'Customers', component: EcommerceProductsList , canActivate: [AuthGuard]},
  { path: 'alpha', component: DashboardsAlpha, canActivate: [AuthGuard] },
  { path: 'meetType', component: meetType, canActivate: [AuthGuard] },
  { path: 'Calendar', component: AppsCalendar, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'pages/page-404' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
