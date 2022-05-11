import { Product } from './../product.model';
import { PresentationMode } from './../../shared/common-types';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() mode: PresentationMode = 'present';
  @Input() product = new Product('', 0, '');
  @Output() productSubmitted = new EventEmitter<Product>();
  @Output() productCanceled = new EventEmitter<void>();
  title = 'Product Details';
  isCanceled = false;

  get isNewProduct() {
    return !this.product || !this.product.id;
  }
  form: FormGroup;

  formErrors = {
    name: '',
    price: '',
    descritpion: '',
    imageUrl: ''
  }

  validationMessages = {
    name: {
      required: 'Product name is required',
      minlength: 'Product name must be at least 2 charcters long',
      maxlength: 'Product name must be no more than 24 charcters long',
    },
    price:{
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      id: {value: this.product.id, disabled: true},
      name: [this.product.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(24)]
      ],
      price: [this.product.price,
        [Validators.required, Validators.minLength(0)]
      ],
      description: [this.product.description,
        [Validators.minLength(2), Validators.maxLength(512)]
      ],
      imageUrl: [this.product.imageUrl,
        Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i)
      ]
    })
  }

}
