import { Component, OnInit } from '@angular/core';

import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Cart } from '../_models/cart';
import { AuthenticationService } from '../_services/authentication.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  username: string;
  isLogin = false;

  carts: Cart[] = [];
  cartCount = 0;
  cartTotalPrice = 0;

  constructor(
    private authService: AuthenticationService,
    private cartServie: CartService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();
    this.username = this.authService.getUsername();

    this.cartServie.currentCart.subscribe(data => {
      this.carts = data;
      this.cartCount = 0;
      this.cartTotalPrice = 0;
      this.carts.forEach(element => {
        this.cartCount += element.quantity;
        this.cartTotalPrice += element.quantity * element.product.price;
      });
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.replace('/');
  }
}
