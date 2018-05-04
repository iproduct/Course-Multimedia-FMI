import { Injectable } from '@angular/core';
import Product from './product.model';
import { PRODUCTS } from './mock-data';

@Injectable()
export class ProductsService {

  constructor() { }

  findAll(): Product[] {
    return PRODUCTS;
  }

}
