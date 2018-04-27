import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock-data';
import Product from '../product.model';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = PRODUCTS;
  selectedProduct: Product;

  constructor() { }

  ngOnInit() {
  }

}
