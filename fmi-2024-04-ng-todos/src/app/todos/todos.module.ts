import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { TodoListComponent } from './todo-list/todo-list.component';



@NgModule({
  declarations: [TodoListComponent],
  exports: [TodoListComponent],
  imports: [
    CommonModule
  ]
})
export class TodosModule { }
