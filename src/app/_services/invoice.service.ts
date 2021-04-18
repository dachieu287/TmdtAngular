import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../_helpers/url-api';
import { Invoice, InvoiceStatus, InvoiceStatusVietnamese } from '../_models/invoice';
import { MyResponse } from '../_models/my-response';
import { PagedResponse } from '../_models/paged-response';

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

  getInvoices(pageNumber: number, pageSize: number): Observable<PagedResponse<Invoice[]>> {
    return this.http.get<PagedResponse<Invoice[]>>(this.invoiceUrl + 'getInvoices', {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString()
      }
    });
  }

  getInvoice(invoiceId: number): Observable<MyResponse<Invoice>> {
    return this.http.get<MyResponse<Invoice>>(this.invoiceUrl + 'getInvoice', {
      params: {
        invoiceId: invoiceId.toString()
      }
    });
  }

  vietnameseStatus(invoices: Invoice[]): void {
    invoices.forEach(element => {
      switch (element.status) {
        case InvoiceStatus.processing:
          element.statusVietnamese = InvoiceStatusVietnamese.processing;
          break;
        case InvoiceStatus.shipping:
          element.statusVietnamese = InvoiceStatusVietnamese.shipping;
          break;
        case InvoiceStatus.done:
          element.statusVietnamese = InvoiceStatusVietnamese.done;
          break;
        case InvoiceStatus.cancelled:
          element.statusVietnamese = InvoiceStatusVietnamese.cancelled;
          break;
      }
    });
  }

  changeStatus(invoiceId: number, status: string): Observable<MyResponse<any>> {
    return this.http.get<MyResponse<any>>(this.invoiceUrl + "changeStatus", {
      params: {
        invoiceId: invoiceId.toString(),
        status
      }
    })
  }
}
