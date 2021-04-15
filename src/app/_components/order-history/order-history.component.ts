import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/_models/invoice';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  invoices: Invoice[];

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory(): void {
    this.invoiceService.orderHistory().subscribe(
      respone => {
        this.invoices = respone.data;
        console.log(respone);
      }
    )
  }

  cancelOrder(id: number): void {
    if (confirm("Hủy đơn hàng?")) {
      this.invoiceService.cancelOrder(id).subscribe(
        response => {
          if (response.succeeded) {
            let invoice = this.invoices.find(i => i.id == response.data);
            invoice.status = "Cancelled";
          }
          else {
            alert(response.message);
          }
        }
      );
    }
  }
}
