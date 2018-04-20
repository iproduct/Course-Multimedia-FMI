export class Todo {
  constructor(
    public title: string,
    public status: TodoStatus = TodoStatus.ACTIVE
  ) {}
}

export enum TodoStatus {
  ACTIVE = 1, COMPLETED, CANCELED
}
