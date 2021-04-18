import { User } from "./user";

export class Invoice {
  constructor(
    public id: number,
    public orderDate: Date,
    public totalPrice: number,
    public status: string,
    public statusVietnamese: string,
    public user: User,
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

export const InvoiceStatus = {
  processing: "Processing",
  shipping: "Shipping",
  done: "Done",
  cancelled: "Cancelled",
}

export const InvoiceStatusVietnamese = {
  processing: "Đang xử lý",
  shipping: "Đang giao",
  done: "Hoàn thành",
  cancelled: "Đã hủy",
}
