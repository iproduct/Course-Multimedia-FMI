import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() newTodo = new EventEmitter<Todo>();
  @ViewChild('todoInput', {static: true}) inputElem: ElementRef | undefined;
  todoText = '';
  history = '';

  constructor() { }

  ngOnInit(): void {
  }

  addTodo(){
    // const text = this.todoText.trim();
    // text = text.trim();
    const text = (this.inputElem?.nativeElement as HTMLInputElement)?.value?.trim();
    if(text.length > 0){
      this.newTodo.emit(new Todo(text));
      this.todoText = '';
    }
    if((this.inputElem?.nativeElement as HTMLInputElement)?.value) {
      (this.inputElem!.nativeElement as HTMLInputElement).value = '';
    }
  }

  onKeyUp(event: KeyboardEvent) {
    this.todoText = (event.target as HTMLInputElement).value;
    this.history += ' | ' + this.todoText;

  }

}
