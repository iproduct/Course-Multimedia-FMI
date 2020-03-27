import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-simple-form',
  template: `
    <form #formElem (ngSubmit)="onSubmit()">
      <p *ngIf="nameCtrl.invalid">Name is invalid.</p>
      <div ngModelGroup="name" #nameCtrl="ngModelGroup">
        <input name="first" [ngModel]="name.first" minlength="2" />
        <input name="last" [ngModel]="name.last" required />
      </div>
      <input name="email" email ngModel />
      <button>Submit</button>
    </form>
    <button (click)="setValue()">Set value</button>
    <p>Form model value: {{form?.value | json}}
    <p>Form model validity: {{form?.valid | json}}
    <p>Component.name: {{name | json}}
  `,
  styles: []
})
export class SimpleFormComponent {
  @ViewChild(NgForm, {static: true}) form: NgForm;
  public name = { first: 'John', last: 'Smith' };
  public onSubmit() {
    console.log(this.form.value);
    console.log(this.form.valid);
  }
  public setValue() {
    this.name = { first: 'Brian', last: 'Adams' };
  }
}
