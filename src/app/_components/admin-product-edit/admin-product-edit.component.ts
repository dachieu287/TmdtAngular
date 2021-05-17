import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css']
})
export class AdminProductEditComponent implements OnInit {
  productId = this.route.snapshot.params.productId;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required ,Validators.pattern(/^[0-9]+$/)]),
    description: new FormControl(''),
    image: new FormControl('')
  });

  file: File;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  get f() {
    return this.form.controls;
  }

  getProduct(): void {
    this.productService.getProduct(this.productId).subscribe(
      response => {
        const product = response;
        this.f.name.setValue(product.name);
        this.f.price.setValue(product.price);
        this.f.description.setValue(product.description);
      }
    )
  }

  editProduct(): void {
    this.productService.editProduct(this.productId, this.f.name.value, this.f.price.value, this.f.description.value, this.file).subscribe(
      response => {
        this.router.navigateByUrl('/admin/products/detail/' + this.productId);
      }
    );
  }

  selectFile(event) {
    this.file = event.target.files?.item(0);
  }
}
