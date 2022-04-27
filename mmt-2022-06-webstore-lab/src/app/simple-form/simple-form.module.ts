import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleFormComponent } from './simple-form.component';



@NgModule({
  declarations: [
    SimpleFormComponent
  ],
  exports: [SimpleFormComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ]
})
export class SimpleFormModule { }
