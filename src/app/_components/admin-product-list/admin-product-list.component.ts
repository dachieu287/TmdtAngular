import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {
  products: Product[];
  pageSize = 5;
  page = 1;
  search = '';
  totalItems = 0;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts(this.page, this.pageSize).subscribe(
      response => {
        this.products = response.data;
        this.totalItems = response.totalRecords;
      }
    )
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getProducts();
  }
}
