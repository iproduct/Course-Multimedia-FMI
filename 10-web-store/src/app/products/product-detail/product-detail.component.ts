import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import Product from '../product.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Input() product = new Product(undefined, undefined, undefined, undefined);
  @Output() productEdited = new EventEmitter<Product>();
  editedProduct: Product;
  isNewProduct = false;

  @ViewChild('form') form: NgForm;

  constructor() { }

  ngOnInit() {
    this.resetProduct();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.product || !this.product.id) {
      this.isNewProduct = true;
      this.product = new Product('' + Date.now(), undefined, undefined, undefined);
      this.resetProduct();
    }
    if (changes['product'].currentValue !== changes['product'].previousValue) {
      this.resetProduct();
    }
  }

  submitProduct() {
    this.productEdited.emit({ ...this.editedProduct});
  }

  cancel() {
    this.productEdited.emit(null);
  }

  resetProduct() {
    this.editedProduct = { ...this.product };
    this.form.resetForm(this.editedProduct);
  }

}
