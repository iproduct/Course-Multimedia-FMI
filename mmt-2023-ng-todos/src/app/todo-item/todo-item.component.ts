import { Todo, TodoStatus } from './../model/todo.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: Todo | undefined;
  @Input() index: number = 1;

  get statusText() {
    return this.todo?.status ? TodoStatus[this.todo?.status] : ''
  }
}
