import { Repository, RepositoryImpl, NumberIdGenerator, IdType } from './repository';
import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoRepo: Repository<Todo> = new RepositoryImpl<Todo>(new NumberIdGenerator());
  constructor() {
    
  }

  getAllTodos(): Todo[] {
    return this.todoRepo.findAll();
  }

  getTodobyId(todoId: IdType): Todo | undefined {
    return this.todoRepo.findById(todoId);
  }

  create(todo: Todo): Todo {
    return this.todoRepo.create(todo);
  }
  update(todo: Todo): Todo | undefined {
    return this.todoRepo.update(todo);
  }
  deleteById(todoId: IdType): Todo | undefined {
    return this.todoRepo.deleteById(todoId);
  }

  getTodosCount(): number {
    return this.todoRepo.count();
  }
}
