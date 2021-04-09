import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../_helpers/url-api';
import { Cart } from '../_models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = API_URL + 'api/cart/';

  private cartsSource = new BehaviorSubject<Cart[]>([]);
  currentCart = this.cartsSource.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.cartUrl + 'getCart');

  }

  addToCart(cart: Cart): Observable<any> {
    return this.http.post(this.cartUrl + 'addToCart', cart);
  }

  updateCart() :void {
    this.getCarts().subscribe(
      data => {
        this.cartsSource.next(data);
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
