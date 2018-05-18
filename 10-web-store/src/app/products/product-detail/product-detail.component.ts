import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import Product from '../product.model';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';

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
  error: string;

  @ViewChild('form') form: NgForm;

  constructor(private productsService: ProductsService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(parmMap => parmMap.get('productId') as string),
      filter(id => !!id),
      switchMap(id => this.productsService.find(id))
    ).subscribe(
      product => {
        this.product = product || this.product;
        this.resetProduct();
      },
      err => this.error = err
    );
    this.resetProduct();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.product || !this.product.id) {
      this.isNewProduct = true;
      this.product = new Product(undefined, undefined, undefined, undefined);
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
