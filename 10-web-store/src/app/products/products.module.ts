import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [ProductListComponent],
  exports: [ProductListComponent]
})
export class ProductsModule { }
