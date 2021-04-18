import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { API_URL } from '../_helpers/url-api';
import { MyResponse } from '../_models/my-response';
import { PagedResponse } from '../_models/paged-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = API_URL + 'api/products';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(pageNumber: number, pageSize: number): Observable<PagedResponse<Product[]>> {
    return this.http.get<PagedResponse<Product[]>>(this.productUrl, { params: {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    }});
  }

  getProduct(productId: number): Observable<MyResponse<Product>> {
    return this.http.get<MyResponse<Product>>(this.productUrl + '/' + productId);
  }

  searchProducts(search: string, pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<Product[]>(this.productUrl, { params: {
      search: search,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    }});
  }

  addProduct(name: string, price: number, description: string, image: Blob): Observable<MyResponse<Product>> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('description', description);
    formData.append('image', image);

    return this.http.post<MyResponse<Product>>(this.productUrl, formData);
  }

  editProduct(id: number, name: string, price: number, description: string, image: Blob): Observable<MyResponse<Product>> {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('description', description);
    formData.append('image', image);

    return this.http.put<MyResponse<Product>>(this.productUrl, formData);
  }

  deleteProduct(id: number): Observable<MyResponse<Product>> {
    return this.http.delete<MyResponse<Product>>(this.productUrl + '/' + id);
  }
}
