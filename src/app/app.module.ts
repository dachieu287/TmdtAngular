import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './_components/header/header.component';
import { ProductListComponent } from './_components/product-list/product-list.component';
import { LoginComponent } from './_components/login/login.component';
import { LogupComponent } from './_components/logup/logup.component';
import { CartComponent } from './_components/cart/cart.component';
import { ProductDetailComponent } from './_components/product-detail/product-detail.component';
import { SearchComponent } from './_components/search/search.component';
import { UserLayoutComponent } from './_layouts/user-layout/user-layout.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { ChangepwdComponent } from './_components/changepwd/changepwd.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { authInterceptorProvoders } from './_helpers/auth.interceptor';
import { OrderHistoryComponent } from './_components/order-history/order-history.component';
import { FooterComponent } from './_components/footer/footer.component';
import { AdminLayoutComponent } from './_layouts/admin-layout/admin-layout.component';
import { AdminProductListComponent } from './_components/admin-product-list/admin-product-list.component';
import { AdminHeaderComponent } from './_components/admin-header/admin-header.component';
import { AdminAddProductComponent } from './_components/admin-add-product/admin-add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    LoginComponent,
    LogupComponent,
    CartComponent,
    ProductDetailComponent,
    SearchComponent,
    UserLayoutComponent,
    ProfileComponent,
    ChangepwdComponent,
    OrderHistoryComponent,
    FooterComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminProductListComponent,
    AdminAddProductComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [authInterceptorProvoders],
  bootstrap: [AppComponent]
})
export class AppModule { }
