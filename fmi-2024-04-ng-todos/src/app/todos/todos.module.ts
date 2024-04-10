import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TodoListComponent, TodoItemComponent, TodoInputComponent],
  exports: [TodoListComponent, TodoItemComponent, TodoInputComponent],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class TodosModule { }
