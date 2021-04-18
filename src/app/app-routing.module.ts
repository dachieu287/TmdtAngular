import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInvoiceDetailComponent } from './_components/admin-invoice-detail/admin-invoice-detail.component';
import { AdminInvoiceListComponent } from './_components/admin-invoice-list/admin-invoice-list.component';
import { AdminProductAddComponent } from './_components/admin-product-add/admin-add-product.component';
import { AdminProductDetailComponent } from './_components/admin-product-detail/admin-product-detail.component';
import { AdminProductEditComponent } from './_components/admin-product-edit/admin-product-edit.component';
import { AdminProductListComponent } from './_components/admin-product-list/admin-product-list.component';
import { CartComponent } from './_components/cart/cart.component';
import { ChangepwdComponent } from './_components/changepwd/changepwd.component';
import { LoginComponent } from './_components/login/login.component';
import { LogupComponent } from './_components/logup/logup.component';
import { OrderHistoryComponent } from './_components/order-history/order-history.component';
import { ProductDetailComponent } from './_components/product-detail/product-detail.component';
import { ProductListComponent } from './_components/product-list/product-list.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { SearchComponent } from './_components/search/search.component';
import { Guard } from './_helpers/guard';
import { AdminLayoutComponent } from './_layouts/admin-layout/admin-layout.component';
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
  ]},
  { path: 'admin', component: AdminLayoutComponent, canActivate: [Guard], children: [
    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
    { path: 'products', component: AdminProductListComponent },
    { path: 'products/add', component: AdminProductAddComponent },
    { path: 'products/detail/:productId', component: AdminProductDetailComponent },
    { path: 'products/edit/:productId', component: AdminProductEditComponent},
    { path: 'invoices', component: AdminInvoiceListComponent },
    { path: 'invoices/detail/:invoiceId', component: AdminInvoiceDetailComponent }
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [Guard]
})
export class AppRoutingModule { }
