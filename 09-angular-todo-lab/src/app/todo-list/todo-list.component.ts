import { Component, OnInit } from '@angular/core';
import TODOS from '../todo-mock-data';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos = TODOS;

  constructor() { }

  ngOnInit() {
  }

}
