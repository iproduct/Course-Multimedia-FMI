import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit {
  name = {first: 'John', last: 'Smith'}

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formModel: NgForm) {
    console.log(formModel.value);
    console.log(formModel.valid);
  }

  setValue() {
    this.name = {first: 'Brian', last: 'Adams'}
  }

  // wrapInPromise(value: string) {
  //   return Promise.resolve(value);
  // }
}
