import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock-products';
import { Product } from '../products.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.findAll().then(products => this.products = products);
  }

  selectProduct(product) {
    this.selectedProduct = product;
  }

  addProduct() {
    this.selectProduct(new Product(undefined, undefined, undefined));
  }

  productChanged(product: Product) {
    if (product.id) {
      this.productService.update(product);
    } else {
      this.productService.create(product);
    }
    // this.products = this.products.map(p => p.id === product.id ? product : p);
  }

  productCanceled() {
    this.selectedProduct = undefined;
  }

}
