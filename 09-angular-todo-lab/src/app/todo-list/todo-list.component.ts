import { Component, OnInit } from '@angular/core';
import TODOS from '../todo-mock-data';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos = TODOS;
  selectedTodo: Todo;

  constructor() { }

  ngOnInit() {
  }

  selectTodo(todo) {
    this.selectedTodo = todo;
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  removeTodo(todo: Todo) {
    const index = TODOS.findIndex(td => td.title === todo.title);
    TODOS.splice(index, 1);
  }


}
