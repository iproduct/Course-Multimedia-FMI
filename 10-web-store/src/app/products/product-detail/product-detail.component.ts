import { Component, OnInit, Input } from '@angular/core';
import Product from '../product.model';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product = new Product(undefined, undefined, undefined, undefined);

  constructor() { }

  ngOnInit() {
  }

  submitProduct() {
  }

}
