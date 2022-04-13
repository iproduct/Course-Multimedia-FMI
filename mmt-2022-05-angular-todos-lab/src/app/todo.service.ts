import { TodoRepository, IdType } from './todo.repository';
import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import MOCK_TODOS from './mock-todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private todoRepo: TodoRepository) {
    MOCK_TODOS.forEach(todo => this.todoRepo.create(todo))
  }

  getAllTodos(){
    return this.todoRepo.findAll();
  }
  getTodoById(id: IdType) {
    return this.todoRepo.findById(id);
  }
  addTodo(todo: Todo) {
    return this.todoRepo.create(todo);
  }
  updateTodo(todo: Todo) {
    return this.todoRepo.update(todo);
  }
  deleteTodoById(id: IdType) {
    return this.todoRepo.deleteById(id);
  }
  getTodosCount() {
    return this.todoRepo.count();
  }
}
