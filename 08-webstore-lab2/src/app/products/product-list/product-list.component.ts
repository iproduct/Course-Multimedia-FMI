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

  constructor(private productService: ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  private refresh() {
    this.productService.findAll().subscribe(
      products => this.products = products,
      error => this.showError(error)
    );
  }

  private showError(error: string) {
    this.messageService.error(error);
  }

}
