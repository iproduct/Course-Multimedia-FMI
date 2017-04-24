import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;
  selectedProduct: Product;

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.products = this.service.findAll();
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

}
