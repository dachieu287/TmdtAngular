import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LogupComponent } from './logup/logup.component';
import { authInterceptorProvoders } from './_helpers/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ProductListComponent,
    LoginComponent,
    LogupComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProvoders],
  bootstrap: [AppComponent]
})
export class AppModule { }
