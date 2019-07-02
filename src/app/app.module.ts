import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MenuLeftComponent } from './components/menu-left/menu-left.component';
import { MenuRightComponent } from './components/menu-right/menu-right.component';
import { FooterComponent } from './components/footer/footer.component';
import { StructureModule } from './structure/structure.module';
import { userService } from '../ShopService/user.service';
import { meetService } from '../ShopService/meetS.service'
import { ShopService } from '../ShopService/shop.service';
import { AuthService } from '../ShopService/auth-service'
import { AuthGuard } from '../ShopService/auth-guard.service'
import { FormsModule } from '@angular/forms';
import { meetType } from './structure/meetType/meetType.page';
import { Calendar } from './structure/Calendar/calendar.page';
import { EcommerceProductsList } from './structure/ecommerce/products-list.page';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';


export const firebaseConfig = {
  apiKey: "AIzaSyDSZi8iTEWv51vLBcpKN3lEJrO72lCl79M",
  authDomain: "webcut-2001a.firebaseapp.com",
  databaseURL: "https://webcut-2001a.firebaseio.com",
  projectId: "webcut-2001a",
  storageBucket: "webcut-2001a.appspot.com",
  messagingSenderId: "474725772867"
}


declare var NProgress: any;

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MenuLeftComponent,
    MenuRightComponent,
    FooterComponent,
    meetType,
    Calendar,
    EcommerceProductsList

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    StructureModule,
    NgbModule.forRoot(),
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule

  ],
  providers: [
    userService,
    AuthService,
    ShopService,
    meetService,
    AuthGuard,
    AngularFireAuth,
    AngularFireDatabase,
    AngularFireDatabaseModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private router: Router) {
    router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
        NProgress.start();
      }

      if (event instanceof NavigationEnd) {
        setTimeout(function () {
          NProgress.done();
        }, 200);
      }

    });
  }
}
