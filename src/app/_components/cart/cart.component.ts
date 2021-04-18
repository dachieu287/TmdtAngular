import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app/_helpers/url-api';
import { Cart } from 'src/app/_models/cart';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CartService } from 'src/app/_services/cart.service';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  imageUrl = API_URL + 'images/';
  carts: Cart[] = [];
  cartCountItems = 0;
  cartTotalPrice = 0;

  isLogin: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthenticationService,
    private invoiceService: InvoiceService
  ) {
    
  }

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();

    this.cartService.Carts.subscribe(
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
        response => {
          this.cartService.updateCart();
        }
      );
  }

  deleteItem(productId: number): void {
    this.cartService.deleteItem(productId).subscribe(
      response => {
        this.cartService.updateCart();
      }
    );
  }

  checkout(): void {
    this.invoiceService.checkout().subscribe(
      response => {
        alert(response.message);
        window.location.replace('/');
      }
    )
  }
}
