import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import MOCK_TODOS from './model/mock-todos';

@Component({
  selector: 'td-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'fmi-2024-04-ng-todos';
  todos = MOCK_TODOS;
  ngOnInit(): void {
  }


}
