import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css'
})
export class TodoInputComponent {
  @ViewChild('todoInput') todoInput!: ElementRef<HTMLInputElement>;
  @Output() newTodo = new EventEmitter<Todo>();
  currentText = '';
  onKeyUp(keyUpEvent: KeyboardEvent) {
    // console.log(keyUpEvent);
    this.currentText = (keyUpEvent.target as HTMLInputElement).value;
  }
  submitTodo() {
    this.newTodo.emit(new Todo(this.todoInput.nativeElement.value));
  }
}
