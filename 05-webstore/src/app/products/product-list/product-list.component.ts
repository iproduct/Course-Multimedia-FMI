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
  selectedProduct: Product;

  constructor() { }

  ngOnInit(): void {
  }

  selectProduct(product) {
    this.selectedProduct = product;
  }

  productChanged(product: Product) {
    this.products = this.products.map(p => p.id === product.id ? product : p);
  }

  productCanceled() {
    this.selectedProduct = undefined;
  }

}
