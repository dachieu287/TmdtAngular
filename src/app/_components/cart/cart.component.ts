import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app/_helpers/url-api';
import { Cart } from 'src/app/_models/cart';
import { IdentityService } from 'src/app/_services/identity.service';
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
    private authService: IdentityService,
    private invoiceService: InvoiceService
  ) {
    
  }

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();

    // this.cartService.CartTotal.subscribe(
    //   response => {
    //     this.cartCountItems = 0;
    //     this.cartTotalPrice = 0;
    //     this.carts.forEach(element => {
    //       this.cartCountItems += element.quantity;
    //       this.cartTotalPrice += element.quantity * element.product.price;
    //     });
    //   }
    // );

    this.getCartDetail();
  }

  getCartDetail(): void {
    this.cartService.getCartDetail().subscribe(
      response => {
        this.carts = response;
      }
    )
  }

  changeQuantity(productId: number, increment: boolean): void {
    this.cartService.changeQuantity(productId, increment)
      .subscribe(
        response => {
          this.cartService.updateCart();
          this.getCartDetail();
        }
      );
  }

  deleteItem(productId: number): void {
    this.cartService.deleteItem(productId).subscribe(
      response => {
        this.cartService.updateCart();
        this.getCartDetail();
      }
    );
  }

  checkout(): void {
    this.invoiceService.checkout().subscribe(
      response => {
        alert("Thành công");
        window.location.replace('/');
      }
    )
  }
}
