import { Component, Input, OnInit } from '@angular/core';
import { Todo, TodoStatus } from '../todo.model';

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

  getTodoStatusString(todoStatus: TodoStatus | undefined){
    return todoStatus ? TodoStatus[todoStatus] : "";
  }
}
