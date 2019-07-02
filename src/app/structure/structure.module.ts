import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { Routes, RouterModule }  from '@angular/router';

import { AppsModule } from './apps/apps.module';
import { ChartsModule } from './charts/charts.module';
import { ComponentsModule } from './components/components.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { DocumentationModule } from './documentation/documentation.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { FormsModule } from './forms/forms.module';
import { IconsModule } from './icons/icons.module';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { TablesModule } from './tables/tables.module';


import { DashboardsAlpha } from './dashboards/alpha.page';
import { PagesLoginBeta } from './pages/login-beta.page';
import { meetType } from './meetType/meetType.page';
import { Calendar } from './Calendar/calendar.page';
import { EcommerceProductsList } from './ecommerce/products-list.page';
import { meetTypeModule } from './meetType/ecommerce.module';


@NgModule({
  imports: [
    CommonModule,
    AppsModule,
    ChartsModule,
    ComponentsModule,
    DashboardsModule,
    DocumentationModule,
    EcommerceModule,
    FormsModule,
    IconsModule,
    LayoutModule,
    PagesModule,
    TablesModule,
  ]
})
export class StructureModule { }
