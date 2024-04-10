import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';



@NgModule({
  declarations: [TodoListComponent, TodoItemComponent],
  exports: [TodoListComponent, TodoItemComponent],
  imports: [
    CommonModule
  ]
})
export class TodosModule { }
