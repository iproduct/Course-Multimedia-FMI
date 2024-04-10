import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todos/components/todo-list/todo-list.component';
import MOCK_TODOS from './todos/model/mock-todos';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/model/todo.model';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports:[TodosModule],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'fmi-2024-04-ng-todos';
  todos = MOCK_TODOS;
  ngOnInit(): void {
  }

  updateTodo(todo: Todo) {
    this.todos = this.todos.map(td => td.id === todo.id ? todo : td);
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(td => td.id !== todo.id);
  }

  createTodo(todo: Todo) {
    this.todos = [... this.todos, todo];
  }

}
