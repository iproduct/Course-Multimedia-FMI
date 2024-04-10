import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Todo, TodoStatus } from '../../model/todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css'
})
export class TodoInputComponent {
  // @ViewChild('todoInput') todoInput!: ElementRef<HTMLInputElement>;
  @Output() newTodo = new EventEmitter<Todo>();
  currentText = '';
  todo = new Todo('');
  onKeyUp(keyUpEvent: KeyboardEvent) {
    // console.log(keyUpEvent);
    this.currentText = (keyUpEvent.target as HTMLInputElement).value;
  }
  submitTodo() {
    if (this.todo.title.trim().length > 0) {
      this.newTodo.emit(this.todo);
      this.todo = new Todo('');
    }
    // this.newTodo.emit(new Todo(this.todoInput.nativeElement.value));
    // this.todoInput.nativeElement.value = '';
  }

  getTodoStatuses() {
    return [TodoStatus.Active, TodoStatus.Completed, TodoStatus.Canceled]
  }

  statusAsStr(status :TodoStatus) {
    return TodoStatus[status];
  }
}
