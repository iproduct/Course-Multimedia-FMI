import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock-products';
import { Product } from '../products.model';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = PRODUCTS as Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
