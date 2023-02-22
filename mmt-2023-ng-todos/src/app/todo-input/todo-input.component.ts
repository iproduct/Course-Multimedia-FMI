import { Todo } from './../model/todo.model';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent {
  @Output() newTodo = new EventEmitter<Todo>();
  todoText: string = '';

  submitTodo() {
    if (this.todoText.trim().length > 0) {
      this.newTodo.emit(new Todo(this.todoText.trim()))
      this.todoText = ''
    }
  }
}
