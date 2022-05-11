import { Component, OnInit } from '@angular/core';
import { PresentationMode } from 'src/app/shared/common-types';
import { MOCK_PRODUCTS } from '../mock-products';
import { Product } from '../product.model';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | undefined;
  mode: PresentationMode = 'present';
  errors: string = '';
  messages: string = '';

  constructor() { }

  ngOnInit(): void {
    this.products = MOCK_PRODUCTS.map(p => ({...p , id: self.crypto.randomUUID()})) as Product[];
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  setMode(mode: PresentationMode) {
    this.mode = mode;
  }

  addProduct() {
    this.selectProduct(new Product('',0,''))
    this.setMode('edit');
  }

  deleteProduct(product: Product){
  }

}
