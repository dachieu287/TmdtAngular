import { Component, OnInit } from '@angular/core';

import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Cart } from 'src/app/_models/cart';
import { IdentityService } from 'src/app/_services/identity.service';
import { CartService } from 'src/app/_services/cart.service';


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

  cartCount = 0;
  cartTotalPrice = 0;

  constructor(
    private authService: IdentityService,
    private cartServie: CartService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();
    this.username = this.authService.getUsername();

    this.cartServie.CartTotal.subscribe(response => {
      this.cartCount = response ? response.totalItem : 0;
      this.cartTotalPrice = response ? response.totalPrice : 0;
    });

    if (this.isLogin) {
      this.cartServie.updateCart();
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.replace('/');
  }

  searchProduct(value: string) {
    value = value.trim();
    if (!value) {
      return;
    }
    window.location.replace('/search/' + value);
  }
}
