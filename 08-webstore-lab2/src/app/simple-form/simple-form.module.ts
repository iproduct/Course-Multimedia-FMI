import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SimpleFormComponent
  ],
  exports: [
    SimpleFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ]
})
export class SimpleFormModule { }
