import { Todo, TodoStatus } from "./todo.model";

const MOCK_TODOS = [
  new Todo('Create TODOs project with Angular CLI', TodoStatus.Completed),
  new Todo('Create TODO model'),
  new Todo('Create TodoList component'),
  new Todo('Create TodoItem component'),
  new Todo('Create TodoRepository service'),
  new Todo('Create TodoInput component'),
  new Todo('Try AOT compilation'),
];

export default MOCK_TODOS;
