import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from 'src/app/_helpers/url-api';
import { Cart } from 'src/app/_models/cart';
import { Product } from 'src/app/_models/product';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  faMinus = faMinus;
  faPlus = faPlus;

  imageUrl = API_URL + 'images/';
  productId: number;
  product: Product = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthenticationService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.productId;
    this.getProduct();
  }

  getProduct(): void {
    
    this.productService.getProduct(this.productId).subscribe(
      response => {
        if (response.succeeded) {
          this.product = response.data;
        }
      }
    );
  }

  addToCart():void {
    if (!this.authService.isLogin()) {
      alert('Vui lòng đăng nhập để mua hàng');
      window.location.replace('/login');
    }

    this.cartService.addToCart(new Cart(this.productId, this.quantity, null)).subscribe(
      response => {
        this.cartService.updateCart();
      }
    );
  }

  plusQuantity(): void {
    this.quantity++;
  }

  minusQuantity(): void {
    this.quantity--;
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }
}
