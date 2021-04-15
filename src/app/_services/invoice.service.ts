import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../_helpers/url-api';
import { Invoice } from '../_models/invoice';
import { MyResponse } from '../_models/my-response';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  invoiceUrl = API_URL + 'api/invoices/';

  constructor(
    private http: HttpClient
  ) { }

  checkout(): Observable<MyResponse<any>> {
    return this.http.get<MyResponse<any>>(this.invoiceUrl + 'checkout');
  }

  orderHistory(): Observable<MyResponse<Invoice[]>> {
    return this.http.get<MyResponse<Invoice[]>>(this.invoiceUrl + 'orderHistory');
  }

  cancelOrder(id: number): Observable<MyResponse<number>> {
    return this.http.delete<MyResponse<number>>(this.invoiceUrl + 'cancelOrder', {
      params: {
        id: id.toString()
      }
    });
  }
}
