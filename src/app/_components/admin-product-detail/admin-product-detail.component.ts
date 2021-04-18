import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'src/app/_helpers/url-api';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit {
  imageUrl = API_URL + 'images/'
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const productId = this.route.snapshot.params.productId;
    this.productService.getProduct(productId).subscribe(
      response => {
        this.product = response.data;
      }
    );
  }

  deleteProduct(): void {
    if (confirm("Xóa sản phẩm?")) {
      this.productService.deleteProduct(this.product.id).subscribe(
        response => {
          if (response.succeeded) {
            alert(response.message);
            this.router.navigateByUrl('/admin/products');
          }
        }
      )
    }
  }
}
