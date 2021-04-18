import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminProductAddComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required ,Validators.pattern(/^[0-9]+$/)]),
    description: new FormControl(''),
    image: new FormControl('', [Validators.required])
  });

  file: File;

  constructor(
    private productService: ProductService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  selectFile(event) {
    this.file = event.target.files.item(0);
  }

  addProduct(): void {
    this.productService.addProduct(this.f.name.value, this.f.price.value, this.f.description.value, this.file).subscribe(
      response => {
        if (response.succeeded) {
          alert(response.message);
          this.route.navigateByUrl("/admin/products");
        }
      }
    );
  }
}
