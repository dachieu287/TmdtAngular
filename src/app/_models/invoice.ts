export class Invoice {
  constructor(
    public id: number,
    public userId: string,
    public orderDate: Date,
    public totalPrice: number,
    public status: string,
    public details: InvoiceDetail[]
  ) {}
}

class InvoiceDetail {
  constructor(
    public productName: string,
    public quantity: number,
    public price: number
  ) {}
}
