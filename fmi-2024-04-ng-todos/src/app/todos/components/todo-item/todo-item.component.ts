import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, TodoStatus } from '../../model/todo.model';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() statusChange = new EventEmitter<Todo>();

  onComplete() {
    this.todo.status = TodoStatus.Completed;
    this.statusChange.emit(this.todo);
  }

  statusAsStr(status :TodoStatus) {
    return TodoStatus[status];
  }

}
