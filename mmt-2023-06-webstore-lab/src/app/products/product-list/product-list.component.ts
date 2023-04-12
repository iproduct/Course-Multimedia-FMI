import { ProductsService } from './../products.service';
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

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    //MOCK_PRODUCTS.map(p => ({ ...p, id: self.crypto.randomUUID() })) as Product[];
    this.productService.findAll()
      .subscribe({
        next: products => {
          this.products = products;
          this.clearMessages();
        },
        error: err => this.errors += err
      });
  }

  selectProduct(product: Product | undefined) {
    this.selectedProduct = product;
  }

  setMode(mode: PresentationMode) {
    this.mode = mode;
  }

  addProduct() {
    this.selectProduct(new Product('', 0, ''))
    this.setMode('edit');
  }

  deleteProduct(product: Product) {
    this.productService.deleteById(product.id)
      .subscribe({
        next: deleted => {
          this.products = this.products.filter(p => p.id !== product.id );
          this.clearMessages();
          this.messages += `Successfully deleted product: '${product.name}'. `
          this.cancelProduct();
        },
        error: err => this.errors += err
      });
  }

  submitProduct(product: Product) {
    if (product.id) { //update
      this.productService.update(product)
        .subscribe({
          next: updated => {
            this.products = this.products.map(p => p.id === updated.id ? updated : p);
            this.clearMessages();
            this.messages += `Successfully updated product: '${updated.name}'. `
          },
          error: err => this.errors += err
        });
    } else { //create
      this.productService.create(product)
        .subscribe({
          next: created => {
            this.products = [...this.products, created]
            this.clearMessages();
            this.messages += `Successfully created product: '${created.name}'. `
          },
          error: err => this.errors += err
        });

    }
  }

  cancelProduct() {
    this.setMode('present');
    this.selectProduct(undefined);
  }

  private clearMessages() {
    this.errors = '';
    this.messages = '';
  }
}
