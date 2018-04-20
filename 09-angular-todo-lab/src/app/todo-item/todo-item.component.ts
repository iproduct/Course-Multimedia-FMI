import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Todo, TodoStatus } from '../todo.model';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Input() index: number;
  @Output() remove = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  getStatusText(todo): string {
    return TodoStatus[todo.status];
  }

  removeTodo() {
    this.remove.emit();
  }

}
