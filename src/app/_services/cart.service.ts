import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../_helpers/url-api';
import { Cart } from '../_models/cart';
import { CartTotalResponse } from '../_responses/cart-total.response';
import { MyResponse } from '../_responses/my.response';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = API_URL + 'api/carts/';

  private bsCartTotal = new BehaviorSubject<CartTotalResponse>(null);
  public CartTotal = this.bsCartTotal.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  getCartTotal(): Observable<CartTotalResponse> {
    return this.http.get<CartTotalResponse>(this.cartUrl + 'getCartTotal');

  }

  getCartDetail(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.cartUrl + 'getCartDetail');
  }

  addToCart(cart: Cart): Observable<any> {
    return this.http.post(this.cartUrl + 'addToCart', cart);
  }

  updateCart() :void {
    this.getCartTotal().subscribe(
      response => {
        this.bsCartTotal.next(response);
      }
    ); 
  }

  changeQuantity(productId: number, increment: boolean): Observable<any> {
    return this.http.post(this.cartUrl + 'changeQuantity', {
      productId,
      increment
    });
  }

  deleteItem(productId: number): Observable<any> {
    return this.http.delete(this.cartUrl + 'deleteItem', { params: {
      productId: productId.toString()
    }});
  }
}
