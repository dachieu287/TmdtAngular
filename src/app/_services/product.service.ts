import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { API_URL } from '../_helpers/url-api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = API_URL + 'api/products';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }
}
