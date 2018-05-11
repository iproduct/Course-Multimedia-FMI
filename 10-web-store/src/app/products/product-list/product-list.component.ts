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
  errors: string;
  selectedProduct: Product;
  isNewProduct = false;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.findAll().subscribe(
      (products) => this.products = products,
      (err) => this.errors = err
    );
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
        this.productService.create(product)
          .subscribe(p => this.products.push(p));
      } else {
        const index = this.products.findIndex(prod => prod.id === product.id);
        this.products.splice(index, 1, product);
      }
    }
    this.selectedProduct = undefined;
    this.isNewProduct = false;
  }

}
