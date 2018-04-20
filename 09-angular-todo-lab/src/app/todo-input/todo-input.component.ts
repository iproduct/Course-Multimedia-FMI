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

  constructor() { }

  ngOnInit() {
  }

  onAddTodo() {
    this.todoAdded.emit(this.todo);
    this.todo = new Todo(undefined);
  }

}
