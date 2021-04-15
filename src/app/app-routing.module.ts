import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './_components/cart/cart.component';
import { ChangepwdComponent } from './_components/changepwd/changepwd.component';
import { LoginComponent } from './_components/login/login.component';
import { LogupComponent } from './_components/logup/logup.component';
import { OrderHistoryComponent } from './_components/order-history/order-history.component';
import { ProductDetailComponent } from './_components/product-detail/product-detail.component';
import { ProductListComponent } from './_components/product-list/product-list.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { SearchComponent } from './_components/search/search.component';
import { UserLayoutComponent } from './_layouts/user-layout/user-layout.component';


const routes: Routes = [
  { path: '', component: UserLayoutComponent, children: [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products', component: ProductListComponent },
    { path: 'login', component: LoginComponent }, 
    { path: 'logup', component: LogupComponent },
    { path: 'cart', component: CartComponent },
    { path: 'products/:productId', component: ProductDetailComponent },
    { path: 'search/:search' , component: SearchComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'changepwd', component: ChangepwdComponent },
    { path: 'order-history', component: OrderHistoryComponent }
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
