import { MessageService } from './../../core/message.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  errors = '';
  messages = '';
  selectedProduct: Product | undefined;
  currentMode = 'present';

  constructor(private productService: ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.refresh();
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  setMode(mode: string) {
    this.currentMode = mode;
  }

  onAddProduct() {

  }

  onDeleteProduct(product: Product) {
    this.productService.delete(product.id).subscribe(
      deleted => {
        const index = this.products.findIndex(p => p.id === product.id);
        this.products.splice(index, 1);

      }
    )
  }

  private refresh() {
    this.productService.findAll().subscribe(
      products => this.products = products,
      error => this.showError(error)
    );
  }

  private showError(error: string) {
    // this.messageService.error(error);
    this.errors = error;
  }
  private showMessage(error: string) {
    // this.messageService.info(error);
    this.messages = error;
  }

}
