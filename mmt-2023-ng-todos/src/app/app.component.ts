import { MOCK_TODOS } from './model/mock-todos';
import { Component } from '@angular/core';
import { Todo } from './model/todo.model';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Todos';
  todos = MOCK_TODOS;

  addTodo(todo: Todo){
    this.todos = this.todos.concat(todo)
  }
}
