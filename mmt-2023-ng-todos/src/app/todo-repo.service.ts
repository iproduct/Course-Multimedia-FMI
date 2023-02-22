import { Injectable } from '@angular/core';
import { Todo } from './model/todo.model';

interface TodoRepo {
  findAll(): Todo[];
  findByText(text: string): Todo | undefined;
  create(todo:Todo): Todo;
  update(todo:Todo): Todo;
  delete(todo:Todo): Todo;
}

@Injectable({
  providedIn: 'root'
})
export class TodoRepoService implements TodoRepo{
  findAll(): Todo[] {
    throw new Error('Method not implemented.');
  }
  findByText(text: string): Todo | undefined {
    throw new Error('Method not implemented.');
  }
  create(todo: Todo): Todo {
    throw new Error('Method not implemented.');
  }
  update(todo: Todo): Todo {
    throw new Error('Method not implemented.');
  }
  delete(todo: Todo): Todo {
    throw new Error('Method not implemented.');
  }


}
