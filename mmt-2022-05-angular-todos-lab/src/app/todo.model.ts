import { Identifiable, IdType } from "./todo.repository";

export enum TodoStatus{
  ACTIVE = 1, COMPLETED, CANCELED
}

export class Todo implements Identifiable {
  id: IdType;
  constructor(public title: string, public status = TodoStatus.ACTIVE) {}
}
