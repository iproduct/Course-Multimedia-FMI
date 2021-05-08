import { PRODUCTS } from './mock-data';
import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BackendMockService } from './backend-mock.service';
import { BackendService } from './backend.service';
import { PRODUCTS_TOKEN } from './injection-tokens';
import { BackendHttpService } from './backend-http.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: BackendService, useClass: BackendHttpService},
    {provide: PRODUCTS_TOKEN, useValue: PRODUCTS}
  ]
})
export class CoreModule { }
