import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../_helpers/url-api';
import { Cart } from '../_models/cart';
import { MyResponse } from '../_models/my-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = API_URL + 'api/carts/';

  private bsCarts = new BehaviorSubject<Cart[]>([]);
  public Carts = this.bsCarts.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  getCarts(): Observable<MyResponse<Cart[]>> {
    return this.http.get<MyResponse<Cart[]>>(this.cartUrl + 'getCart');

  }

  addToCart(cart: Cart): Observable<any> {
    return this.http.post(this.cartUrl + 'addToCart', cart);
  }

  updateCart() :void {
    this.getCarts().subscribe(
      response => {
        this.bsCarts.next(response.data);
      }
    ); 
  }

  changeQuantity(productId: number, increment: boolean): Observable<any> {
    return this.http.get(this.cartUrl + 'changeQuantity', { params: {
      productId: productId.toString(),
      increment: increment.toString()
    }});
  }

  deleteItem(productId: number): Observable<any> {
    return this.http.delete(this.cartUrl + 'deleteItem', { params: {
      productId: productId.toString()
    }});
  }
}
