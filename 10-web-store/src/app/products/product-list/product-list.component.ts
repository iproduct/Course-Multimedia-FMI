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
  isNewProduct = false;

  constructor() { }

  ngOnInit() {
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.isNewProduct = false;
  }

  addNewProduct() {
    this.selectedProduct = undefined;
    this.isNewProduct = true;
  }

  editProduct(product: Product) {
    if (product) {
      if (this.isNewProduct) {
        this.products.push(product);
      } else {
        const index = this.products.findIndex(prod => prod.id === product.id);
        this.products.splice(index, 1, product);
      }
    }
    this.selectedProduct = undefined;
    this.isNewProduct = false;
  }

}
