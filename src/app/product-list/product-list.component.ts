import { Component, OnInit } from '@angular/core';
import { API_URL } from '../_helpers/url-api';
import { Cart } from '../_models/cart';
import { Product } from '../_models/product';
import { AuthenticationService } from '../_services/authentication.service';
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
  page = 1;
  pageSize = 3;
  totalItems = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts(this.page, this.pageSize)
      .subscribe(response => {
        this.products = response.data;
        this.totalItems = response.totalRecords;

      });
  }



  addToCart(productId: number, quantity: number = 1) : void {
    if (!this.authService.isLogin()) {
      alert("Vui lòng đăng nhập để bắt đầu mua hàng");
      window.location.replace('/login');
      return;
    }

    var cart: Cart = new Cart(productId, quantity, null);
    this.cartService.addToCart(cart).subscribe(
      response => {
        this.cartService.updateCart();
      }
    );
    alert('Đã thêm vào giỏ hàng'); 
  }

  handlePageChange(event: number) {
    this.page = event;
    this.getProducts();
  }
}
