import { Injectable } from "@angular/core";
import { Todo } from "./todo.model";

export type IdType = number | undefined;

export interface Identifiable {
  id: IdType;
}

export interface IdGenerator{
  getNextId(): IdType;
}

@Injectable({
  providedIn: 'root'
})
export class NumberIdGenrator implements IdGenerator{
  private nextId = 0;
  getNextId(): IdType {
    return ++this.nextId;
  }
}

export interface Repository<T extends Identifiable> {
  findAll(): T[];
  findById(id: IdType): T | undefined;
  create(entity: T): T,
  update(entity: T): T | undefined,
  deleteById(id: IdType): T | undefined,
  count(): number;
}
export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
  protected entities = new Map<IdType, T>();

  constructor(private idGen: IdGenerator){}

  findAll(): T[] {
    return Array.from(this.entities.values());
  }
  findById(id: IdType): T | undefined {
    throw this.entities.get(id);
  }
  create(entity: T): T {
    entity.id = this.idGen.getNextId();
    this.entities.set(entity.id, entity);
    return entity;
  }
  update(entity: T): T | undefined {
    if(!this.findById(entity.id)) {
      return undefined;
    }
    this.entities.set(entity.id, entity);
    return entity;
  }
  deleteById(id: IdType): T | undefined {
    const old = this.findById(id);
    if(!old) {
      return undefined;
    }
    this.entities.delete(id);
    return old;
  }
  count(): number {
    return this.entities.size;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TodoRepository extends RepositoryImpl<Todo>{
  constructor(idGen: NumberIdGenrator){
    super(idGen);
  }
}
