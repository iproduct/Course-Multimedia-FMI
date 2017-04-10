import { Injectable } from '@angular/core';
import { Product } from './product.model';

const PRODUCTS = [
  new Product(1, 'Wireless Mouse', 15.7, 'Good quality'),
  new Product(2, 'Whiteboard Marker', 5.99, '5 pieces'),
  new Product(3, 'Raspberry Pi', 35.99, 'Third most popular computer'),
  new Product(4, 'USB Keyboard', 22.5, 'Good quality'),
  new Product(5, 'Coffee', 2.5, 'A must!')
];

@Injectable()
export class ProductService {
  private products: Product[] = PRODUCTS;

  constructor() { }

  findAll() {
    return this.products;
  }

}
