import { Invoice } from "../_models/invoice";

export class InvoicesPagedResponse {
  constructor(   
    public pageNumber: number,
    public pageSize: number,
    public totalPage: number,
    public totalRecords: number,
    public invoices: Invoice[],
  ) {} 
}