import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange,
  SimpleChanges, AfterViewChecked, ViewChild, OnDestroy } from '@angular/core';
import { Product } from '../products.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ws-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {
  @Input('product') masterProduct: Product;
  @Input() mode = 'present';
  @Output() productChange = new EventEmitter<Product>();
  @Output() cancelChange = new EventEmitter<void>();
  @ViewChild('f') form: NgForm;

  product: Product = new Product(undefined, undefined, undefined);
  previousForm: NgForm;
  statusSubscription: Subscription;

  formErrors = {
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  };

  validationMessages = {
    name: {
      required: 'Product name is required.',
      minlength: 'Username must be at least 2 characters long.',
      maxlength: 'Username cannot be more than 30 characters long.'
    },
    price: {
      required: 'Price is required.',
      pattern: 'Price should a positive number.'
    },
    description: {
      required: 'Description is required.'
    },
    imageUrl: {
      pattern: 'Image URL should be valid (ex. http://example.com/image/path.jpeg).'
    }
  };


  constructor() { }


  ngOnInit(): void {
    this.resetProduct();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.masterProduct.currentValue !== changes.masterProduct.previousValue) {
      this.resetProduct();
    }
  }

  ngAfterViewChecked(): void {
    if (this.form && this.form !== this.previousForm) {
      this.previousForm = this.form;
      if (this.statusSubscription) { this.statusSubscription.unsubscribe(); }
      this.statusSubscription = this.form.statusChanges.subscribe(status => this.onStatusChanged());
    }
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) { this.statusSubscription.unsubscribe(); }
  }

  submitProduct() {
    this.masterProduct = Object.assign({}, this.product);
    this.productChange.emit(this.masterProduct);
  }

  resetProduct() {
    this.product = Object.assign({}, this.masterProduct);
  }

  cancelProduct(){
    this.cancelChange.emit();
  }

  private onStatusChanged() {
    if (!this.form) { return; }
    const form = this.form.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (control.dirty || control.touched) && control.invalid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
