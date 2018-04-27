import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  /*@Input()*/ todo = new Todo(undefined);
  @Output() todoAdded = new EventEmitter<Todo>();
  text = '';

  constructor() { }

  ngOnInit() {
  }

  onAddTodo(todoText) {
    this.todoAdded.emit(new Todo(todoText));
    // this.todo = new Todo(undefined);
  }

  onKeyup(ev: KeyboardEvent) {
    this.text = (ev.target as HTMLInputElement).value;
  }

}
