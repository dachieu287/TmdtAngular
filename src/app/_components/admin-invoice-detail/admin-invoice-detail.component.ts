import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Invoice, InvoiceStatus, InvoiceStatusVietnamese } from 'src/app/_models/invoice';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-admin-invoice-detail',
  templateUrl: './admin-invoice-detail.component.html',
  styleUrls: ['./admin-invoice-detail.component.css']
})
export class AdminInvoiceDetailComponent implements OnInit {
  invoice: Invoice;
  invoiceId: number;

  form = new FormGroup({
    status: new FormControl()
  });

  InvoiceStatus = InvoiceStatus;
  InvoiceStatusVietnamese = InvoiceStatusVietnamese;

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params.invoiceId;
    this.getInvoice();
  }

  getInvoice(): void {
    this.invoiceService.getInvoice(this.invoiceId).subscribe(
      response => {
        this.invoice = response;
        this.invoiceService.vietnameseStatus([this.invoice]);
      }
    )
  }

  onChange() {
    //console.log(this.form.controls.status.value);
    this.invoiceService.changeStatus(this.invoiceId, this.form.controls.status.value).subscribe();
  }
}
