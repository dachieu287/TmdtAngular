import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/_models/invoice';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-admin-invoice-list',
  templateUrl: './admin-invoice-list.component.html',
  styleUrls: ['./admin-invoice-list.component.css']
})
export class AdminInvoiceListComponent implements OnInit {
  invoices: Invoice[];

  pageNumber = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(): void {
    this.invoiceService.getInvoices(this.pageNumber, this.pageSize).subscribe(
      response => {
        this.invoices = response.invoices;
        this.totalItems = response.totalRecords;
        this.invoiceService.vietnameseStatus(this.invoices);
      }
    )
  }

  handlePageChange(event: number) {
    this.pageNumber = event;
    this.getInvoices();
  }
}
