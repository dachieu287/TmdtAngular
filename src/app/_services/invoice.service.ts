import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../_helpers/url-api';
import { Invoice, InvoiceStatus, InvoiceStatusVietnamese } from '../_models/invoice';
import { BaseResponse } from '../_responses/base.response';
import { InvoicesPagedResponse } from '../_responses/invoices-paged.response';
import { MyResponse } from '../_responses/my.response';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  invoiceUrl = API_URL + 'api/invoices/';

  constructor(
    private http: HttpClient
  ) { }

  checkout(): Observable<any> {
    return this.http.post<any>(this.invoiceUrl + 'checkout', {});
  }

  orderHistory(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoiceUrl + 'orderHistory');
  }

  cancelOrder(id: number): Observable<BaseResponse> {
    return this.http.put<BaseResponse>(this.invoiceUrl + 'cancelOrder', {
      invoiceId: id
    });
  }

  getInvoices(pageNumber: number, pageSize: number): Observable<InvoicesPagedResponse> {
    return this.http.get<InvoicesPagedResponse>(this.invoiceUrl + 'getInvoices', {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString()
      }
    });
  }

  getInvoice(invoiceId: number): Observable<Invoice> {
    return this.http.get<Invoice>(this.invoiceUrl + 'getInvoice', {
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

  changeStatus(invoiceId: number, status: string): Observable<any> {
    return this.http.put<any>(this.invoiceUrl + "changeStatus", {
      invoiceId,
      status
    })
  }
}
