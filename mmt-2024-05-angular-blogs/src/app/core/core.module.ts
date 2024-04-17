import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API, ApiClientHttpService } from './api-client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [{provide: API, useClass: ApiClientHttpService}]
})
export class CoreModule { }
