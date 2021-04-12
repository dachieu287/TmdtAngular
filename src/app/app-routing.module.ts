import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { LogupComponent } from './logup/logup.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { UserLayoutComponent } from './_layouts/user-layout/user-layout.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: UserLayoutComponent, children: [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products', component: ProductListComponent },
    { path: 'login', component: LoginComponent }, 
    { path: 'logup', component: LogupComponent },
    { path: 'cart', component: CartComponent },
    { path: 'products/:productId', component: ProductDetailComponent },
    { path: 'search/:search' , component: SearchComponent },
    { path: 'profile', component: ProfileComponent }
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
