import { TodoStatus } from './../todo.model';
import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Input() index: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getStatusText(status: TodoStatus | undefined) {
    return status ? TodoStatus[status] : 'undefined';
  }

}
