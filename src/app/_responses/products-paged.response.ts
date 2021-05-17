import { Product } from "../_models/product";

export class ProductsPagedResponse {
  constructor(   
    public pageNumber: number,
    public pageSize: number,
    public totalPage: number,
    public totalRecords: number,
    public products: Product[],
  ) {} 
}