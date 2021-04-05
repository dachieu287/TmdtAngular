import { Product } from "./product";

export class Cart {
  constructor(
    public productId: number,
    public quantity: number,
    public product: Product
  ) {}
}
