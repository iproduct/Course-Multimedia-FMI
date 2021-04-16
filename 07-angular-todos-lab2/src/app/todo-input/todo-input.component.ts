import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() newTodo = new EventEmitter<Todo>();
  // @ViewChild('todoInput', {static: true}) inputElem: ElementRef<HTMLInputElement> | undefined;

  text = '';

  constructor() { }

  ngOnInit(): void {
  }

  createTodo() {
    const text = this.text.trim();
    if (text !== '') {
      this.newTodo.emit(new Todo(text));
      this.text = '';
      // tslint:disable-next-line: no-non-null-assertion
      // this.inputElem!.nativeElement.value = '';
    }
  }

  onKey(todoText: string) {
    this.text = todoText;
    // tslint:disable-next-line: no-non-null-assertion
    // this.text = this.inputElem!.nativeElement.value;
    // const target = event?.target as HTMLInputElement;
    // this.text = target.value;
  }
}
