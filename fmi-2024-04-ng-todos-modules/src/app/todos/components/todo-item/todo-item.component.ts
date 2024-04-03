import { Component, Input } from '@angular/core';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo: Todo | undefined;

}
