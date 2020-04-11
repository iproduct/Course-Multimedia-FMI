import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROMISE_BACKEND } from './promise-backend.service';
import { PromiseBackendMockService } from './promise-backend-mock.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{provide: PROMISE_BACKEND, useClass: PromiseBackendMockService}]
})
export class CoreModule { }
