import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() newTodo = new EventEmitter<Todo>();
  todoText = '';
  history = '';

  constructor() { }

  ngOnInit(): void {
  }

  addTodo(){
    const text = this.todoText.trim();
    if(text.length > 0){
      this.newTodo.emit(new Todo(text));
      this.todoText = '';
    }
  }

  onKeyUp(event: KeyboardEvent) {
    this.todoText = (event.target as HTMLInputElement).value;
    this.history += ' | ' + this.todoText;

  }

}
