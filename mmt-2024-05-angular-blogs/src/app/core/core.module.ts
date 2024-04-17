import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API, ApiClientHttpService } from './api-client.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{provide: API, useClass: ApiClientHttpService}]
})
export class CoreModule { }
