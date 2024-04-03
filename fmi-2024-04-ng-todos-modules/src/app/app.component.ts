import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todos/components/todo-list/todo-list.component';
import MOCK_TODOS from './todos/model/mock-todos';
import { TodosModule } from './todos/todos.module';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'fmi-2024-04-ng-todos';
  todos = MOCK_TODOS;
  ngOnInit(): void {
  }


}
