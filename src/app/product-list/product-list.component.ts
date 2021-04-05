import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { API_URL } from '../_helpers/url-api';
import { Cart } from '../_models/cart';
import { Product } from '../_models/product';
import { CartService } from '../_services/cart.service';
import { ProductService } from '../_services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public url = API_URL;
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(product => this.products = product);
  }



  addToCart(productId: number, quantity: number = 1) : void {
    var cart: Cart = new Cart(productId, quantity, null);
    this.cartService.addToCart(cart).subscribe(
      data => {
        this.cartService.updateCart();
      }
    );
    //alert('Đã thêm vào giỏ hàng'); 
  }
}