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

  selectProduct(product: Product | undefined) {
    this.selectedProduct = product;
  }

  setMode(mode: string) {
    this.currentMode = mode;
  }

  showAddProduct() {
    this.setMode('edit');
    this.selectProduct(new Product());
  }

  onDeleteProduct(product: Product) {
    this.productService.delete(product.id).subscribe(
      deleted => {
        const index = this.products.findIndex(p => p.id === product.id);
        this.products.splice(index, 1);
      },
      error => this.showError(error)
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

  onProductModified(product: Product) {
    if (product.id) { // edit mode
      this.productService.update(product).subscribe(
        updated => {
          const index = this.products.findIndex(p => p.id === updated.id);
          this.products[index] = updated;
          this.showMessage(`Product '${updated.name}' updated successfully.`);
        },
        err => this.showError(err)
      );
    } else {
      this.productService.create(product).subscribe(
        created => {
          this.products.push(created);
          this.showMessage(`Product '${created.name}' created successfully.`);
        },
        err => this.showError(err)
      );
    }
  }

  onProductCanceled() {
    this.selectProduct(undefined);
  }

}
