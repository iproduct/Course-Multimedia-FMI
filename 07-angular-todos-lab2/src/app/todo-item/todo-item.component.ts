import { TodoStatus } from './../todo.model';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { Output } from '@angular/core';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Input() index: number | undefined;
  @Output() deleteTodo = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit(): void {
  }

  getStatusText(status: TodoStatus | undefined) {
    return status ? TodoStatus[status] : 'undefined';
  }

  deleteItem(){
    this.deleteTodo.emit(this.todo);
  }

}
