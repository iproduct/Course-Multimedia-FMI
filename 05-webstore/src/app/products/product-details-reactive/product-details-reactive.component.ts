import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange,
  SimpleChanges, AfterViewChecked, ViewChild, OnDestroy } from '@angular/core';
import { Product } from '../products.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ws-product-details-reactive',
  templateUrl: './product-details-reactive.component.html',
  styleUrls: ['./product-details-reactive.component.css']
})
export class ProductDetailsReactiveComponent implements OnInit, OnChanges, OnDestroy {
    @Input() product: Product;
    @Input() mode = 'present';
    @Output() productChange = new EventEmitter<Product>();
    @Output() cancelChange = new EventEmitter<void>();
    form: FormGroup;
    private statusSubscription: Subscription;

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
        min: 'Price should a positive number.'
      },
      description: {
        required: 'Description is required.'
      },
      imageUrl: {
        pattern: 'Image URL should be valid (ex. http://example.com/image/path.jpeg).'
      }
    };


    constructor(private builder: FormBuilder) { }


    ngOnInit(): void {
      this.buildForm();
    }

    ngOnDestroy(): void {
      if (this.statusSubscription && !this.statusSubscription.closed) {
        this.statusSubscription.unsubscribe();
      }
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes.product.currentValue !== changes.product.previousValue) {
        this.resetProduct();
      }
    }

    buildForm() {
      this.form = this.builder.group({
        id: {value: this.product.id, disabled: true},
        name: [
          this.product.name,
          [Validators.required, Validators.minLength(2), Validators.maxLength(30)]
        ],
        price: [
          this.product.price,
          [Validators.required, Validators.min(0)]
        ],
        description: [
          this.product.description,
          Validators.required
        ],
        imageUrl: [
          this.product.imageUrl,
          [ Validators.required,
            Validators.pattern(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i)
          ]
        ]
      });
      this.statusSubscription = this.form.statusChanges.subscribe(() => this.onStatusChanged());
    }

    submitProduct() {
      const value = this.form.getRawValue();
      this.productChange.emit(value);
      this.product = value;
      this.resetProduct();
    }

    resetProduct() {
      if (this.form) {
        this.form.reset(this.product);
      }
    }

    cancelProduct() {
      this.cancelChange.emit();
    }

    private onStatusChanged() {
      if (!this.form) { return; }
      const form = this.form;

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
