import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleFormModule } from './simple-form/simple-form.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RxDemoModule } from './rx-demo/rx-demo.module';
import { WikiModule } from './wiki/wiki.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    SimpleFormModule,
    ProductsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    RxDemoModule,
    WikiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
