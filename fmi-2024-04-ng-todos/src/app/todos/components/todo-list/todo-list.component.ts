import { TodoStatus } from '../../model/todo.model';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  @Input({ required: true }) todos!:Todo[];
  @Output() statusChange = new EventEmitter<Todo>();
  @Output()  delete= new EventEmitter<Todo>();
  getStatusStr(status: TodoStatus){
    return TodoStatus[status]
  }
  identity(index: number, todo: Todo) {
    return todo.id;
  }
}
