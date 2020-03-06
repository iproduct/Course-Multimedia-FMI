import { Component, OnInit } from '@angular/core';
import MOCK_TODOS from '../mock-todos';
import { TodoStatus } from '../todo.model';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos = MOCK_TODOS;

  constructor() { }

  ngOnInit(): void {
  }

  getStatus(status: TodoStatus) {
    return TodoStatus[status];
  }

}
