import { Component, OnInit } from '@angular/core';
import { API_URL } from '../_helpers/url-api';
import { Cart } from '../_models/cart';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  url = API_URL;
  carts: Cart[] = [];
  cartCountItems = 0;
  cartTotalPrice = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.currentCart.subscribe(
      data => {
        this.carts = data;
        this.cartCountItems = 0;
        this.cartTotalPrice = 0;
        this.carts.forEach(element => {
          this.cartCountItems += element.quantity;
          this.cartTotalPrice += element.quantity * element.product.price;
        });
      }
    );
  }

  changeQuantity(productId: number, increment: boolean): void {
    this.cartService.changeQuantity(productId, increment)
      .subscribe(
        data => {
          this.cartService.updateCart();
        }
      );
  }

  deleteItem(productId: number): void {
    this.cartService.deleteItem(productId).subscribe(
      data => {
        this.cartService.updateCart();
      }
    );
  }
}
