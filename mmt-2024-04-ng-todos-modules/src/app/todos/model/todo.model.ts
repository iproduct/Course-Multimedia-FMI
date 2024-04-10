type IdType = number;

export enum TodoStatus {
  Active = 1, Completed, Canceled
}

export class Todo {
  static nextId = 0;
  id: IdType = Todo.nextId++;
  constructor(public title: string, public status: TodoStatus = TodoStatus.Active) {}
}
