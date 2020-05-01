import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock-products';
import { Product } from '../products.model';
import { ProductsService } from '../products.service';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(private productService: ProductsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.refreshProducts();
  }

  selectProduct(product) {
    this.selectedProduct = product;
  }

  addProduct() {
    this.selectProduct(new Product(undefined, undefined, undefined));
  }

  productChanged(product: Product) {
    if (product.id) {
      this.productService.update(product).subscribe(
        updated => {
          const index = this.products.findIndex(p => p.id === updated.id);
          this.products[index] = updated;
          this.showMessage(`Product ${updated.name} updated successfully.`);
        },
        err => this.showError(err)
      );
    } else {
      this.productService.create(product).subscribe(
        created => {
          this.products.push(created);
          this.showMessage(`Product ${created.name} created successfully.`);
        },
        err => this.showError(err)
      );
    }
    // this.products = this.products.map(p => p.id === product.id ? product : p);
  }

  productCanceled() {
    this.selectedProduct = undefined;
  }

  refreshProducts() {
    this.productService.findAll().subscribe(
      products => this.products = products,
      err => this.showError(err)
    );
  }

  protected showMessage(msg) {
    this.messageService.info(msg);
  }

  protected showError(err) {
    this.messageService.error(err);
  }


}
