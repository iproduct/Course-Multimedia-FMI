import { Component, EventEmitter, Output } from '@angular/core';
import { OutletContext } from '@angular/router';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css'
})
export class TodoInputComponent {
  @Output() newTodo = new EventEmitter<Todo>();
  currentText = '';
  onKeyUp(keyUpEvent: KeyboardEvent) {
    // console.log(keyUpEvent);
    this.currentText = (keyUpEvent.target as HTMLInputElement).value;
  }
  submitTodo(todoText: string) {
    this.newTodo.emit(new Todo(todoText));
  }
}
