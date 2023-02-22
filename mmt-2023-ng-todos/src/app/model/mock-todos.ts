import  { Todo, TodoStatus }from "./todo.model";

export const MOCK_TODOS = [
  new Todo('Create TODOs project using Angular CLI', TodoStatus.COMPLETED),
  new Todo('Create Todo model', TodoStatus.COMPLETED),
  new Todo('Create TodoList component'),
  new Todo('Create TodoItem component'),
  new Todo('Create TodoRepository service'),
  new Todo('Create TodoInput component'),
  new Todo('Improve styling'),
];
