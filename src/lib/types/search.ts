import { StringLiteral } from "typescript";

export interface CartItem {
  _id: string;
  quantity: number;
  price: number;
  image: string;
  name: string;
}
