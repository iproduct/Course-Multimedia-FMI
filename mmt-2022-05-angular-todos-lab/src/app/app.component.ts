import { TodoService } from './todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatus } from './todo.model';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular TODOs Demo';
  todos: Todo[] = [];
  constructor(private todoService: TodoService){}
  
  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos();
  }

  getTodoStatusString(todoStatus: TodoStatus){
    return TodoStatus[todoStatus];
  }


}
