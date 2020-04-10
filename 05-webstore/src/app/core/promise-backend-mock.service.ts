import { Injectable } from '@angular/core';
import { PromiseBackendService } from './promise-backend.service';
import { Identifiable, ResourceType, IdType } from '../shared/shared-types';
import { Product } from '../products/products.model';
import { PRODUCTS } from '../products/mock-products';

@Injectable()
export class PromiseBackendMockService implements PromiseBackendService {
  private static nextId = 0;
  private entityMap = new Map<string, Identifiable[]>();

  constructor() {
    this.entityMap.set(Product.typeId, PRODUCTS);
  }

  findAll<T extends Identifiable>(kind: ResourceType<T>): Promise<T[]> {
    const result = this.entityMap.get(kind.typeId);
    if (result) {
      return Promise.resolve(result as T[]);
    } else {
      return Promise.reject(new Error(`${kind.typeId} entity not known.`));
    }
  }

  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T> {
    const collection = this.entityMap.get(kind.typeId);
    const result = collection && collection.find(e => e.id === id);
    if (result) {
      return Promise.resolve(result as T);
    } else {
      return Promise.reject(new Error(`${kind.typeId} with ID=${id} does not exist.`));
    }
  }

  create<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T> {
    entity.id = this.getNextId();
    const collection = this.entityMap.get(kind.typeId);
    if (collection) {
      collection.push(entity);
      return Promise.resolve(entity);
    } else {
      return Promise.reject(new Error(`${kind.typeId} entity not known.`));
    }
  }

  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T> {
    const collection = this.entityMap.get(kind.typeId);
    const result = collection && collection.find(e => e.id === entity.id);
    if (result) {
      const index = collection.findIndex(e => e.id === entity.id);
      collection[index] = entity;
      return Promise.resolve(entity);
    } else {
      return Promise.reject(new Error(`${kind.typeId} with ID=${entity.id} does not exist.`));
    }
  }

  deleteById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T> {
    const collection = this.entityMap.get(kind.typeId);
    const index = collection && collection.findIndex(e => e.id === id);
    if (collection && index >= 0) {
      const deleted = collection[index];
      collection.splice(index, 1);
      return Promise.resolve(deleted as T);
    } else {
      return Promise.reject(new Error(`${kind.typeId} with ID=${id} does not exist.`));
    }
  }

  private getNextId(): IdType {
    return ++PromiseBackendMockService.nextId + '';
  }

}
