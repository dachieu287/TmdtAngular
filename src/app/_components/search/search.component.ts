import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from 'src/app/_helpers/url-api';
import { Cart } from 'src/app/_models/cart';
import { Product } from 'src/app/_models/product';
import { IdentityService } from 'src/app/_services/identity.service';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public urlImage = API_URL + "images/";

  products: Product[] = [];
  search = '';
  page = 1;
  pageSize = 3;
  totalItems = 0;

  constructor(
    private authService: IdentityService,
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.search = this.route.snapshot.params.search;
    this.searchProducts();
  }
  
  searchProducts(): void {
    this.productService.searchProducts(this.search ,this.page, this.pageSize)
      .subscribe(response => {
        this.products = response.products;
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
        console.log(response);
        this.cartService.updateCart();
      }
    );
    alert('Đã thêm vào giỏ hàng'); 
  }

  handlePageChange(event: number) {
    this.page = event;
    this.searchProducts();
  }
}
