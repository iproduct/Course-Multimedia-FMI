import { Product } from './../product.model';
import { PresentationMode } from './../../shared/common-types';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

interface FormErrors {
  [key: string]: string
}
interface FormValidationMessages {
  [key: string]: FormErrors
}



@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() mode: PresentationMode = 'present';
  @Input() product = new Product('', 0, '');
  @Output() productSubmitted = new EventEmitter<Product>();
  @Output() productCanceled = new EventEmitter<void>();
  title = 'Product Details';
  isCanceled = false;

  get isNewProduct() {
    return !this.product || !this.product.id;
  }
  form: FormGroup = this.fb.group({}) ;
  statusSubscription: Subscription | undefined;

  formErrors: FormErrors = {
    name: '',
    price: '',
    descritpion: '',
    imageUrl: ''
  }

  validationMessages: FormValidationMessages = {
    name: {
      required: 'Product name is required',
      minlength: 'Product name must be at least 2 charcters long',
      maxlength: 'Product name must be no more than 24 charcters long',
    },
    price: {
      required: 'Product price is required',
      min: 'Price should be positive number'
    },
    descritpion: {
      minlength: 'Product description must be at least 2 charcters long',
      maxlength: 'Product description must be no more than 512 charcters long',
    },
    imageUrl: {
      pattern: 'Product image URL should be valid URL (ex. http://example.com/image.jpg)'
    }
  }

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.statusSubscription?.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges): void {
    const prodChange = changes["product"];
    if (prodChange && prodChange.currentValue != prodChange.previousValue) {
      this.reset();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: { value: this.product.id, disabled: true },
      name: [this.product.name,
      [Validators.required, Validators.minLength(2), Validators.maxLength(24)]
      ],
      price: [this.product.price,
      [Validators.required, Validators.min(0.01)]
      ],
      description: [this.product.description,
      [Validators.minLength(2), Validators.maxLength(512)]
      ],
      imageUrl: [this.product.imageUrl,
      Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i)
      ]
    });
    this.statusSubscription = this.form.statusChanges.subscribe(() => this.onStatusChanged())
  }

  submitProduct() {
    this.product = this.form.getRawValue();
    this.productSubmitted.emit(this.product);
    this.reset();
  }

  reset() {
    if (this.form && this.product) {
      this.form.reset(this.product);
    }
  }

  cancelProduct() {
    this.productCanceled.emit();
    this.isCanceled = true;
  }

  getFormValue(field: string) {
    return this.form?.get(field)?.value;
  }

  protected onStatusChanged() {
    if (!this.form) { return; }
    const form = this.form;

    for (const field in this.formErrors) {
      // clear old validation error messages
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
