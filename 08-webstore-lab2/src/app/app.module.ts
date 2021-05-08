import { WikiModule } from './wiki/wiki.module';
import { RxdemoModule } from './rxdemo/rxdemo.module';
import { ProductsModule } from './products/products.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleFormModule } from './simple-form/simple-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SimpleFormModule,
    CoreModule,
    ProductsModule,
    BrowserAnimationsModule,
    RxdemoModule,
    WikiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
