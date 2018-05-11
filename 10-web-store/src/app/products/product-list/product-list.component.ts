import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock-data';
import Product from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;
  isNewProduct = false;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.products = this.productService.findAll();
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
