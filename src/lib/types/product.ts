import { ProductCollection, ProductStatus } from "../enums/product.enums";

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: string;
  productVolume: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquiry {
  page: number;
  limit: number;
  order: string;
  productCollection?: ProductCollection;
  search?: string;
  direction?: number;
}
