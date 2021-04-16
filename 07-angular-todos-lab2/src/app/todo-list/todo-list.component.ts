import { TodoService } from './../todo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.todos = this.todoService.getAllTodos();
  }

  addTodo(todo: Todo) {
    this.todoService.create(todo);
    this.refresh();
  }

  deleteTodo(todo: Todo){
    this.todoService.deleteById(todo.id);
    this.refresh();
  }

  trackByTodos(index: number, todo: Todo) {
    return todo.id;
  }

}
