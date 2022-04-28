import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit, AfterContentChecked {
  @ViewChild('fElem') fElem: ElementRef | undefined;
  name = { first: 'John', last: 'Smith' };
  email = '';
  elemClasses = '';

  constructor() { }
  ngAfterContentChecked(): void {
    this.elemClasses = this.fElem?.nativeElement.className;
  }

  ngOnInit(): void {
  }

  onSubmit(formModel: NgForm) {
    const value = { name: this.name, email: this.email }
    console.log(value);
    console.log("valid:", formModel.valid);
  }

  setValue() {
    this.name = { first: 'Brian', last: 'Adams' }
  }

}
