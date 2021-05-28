import { Injectable, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Identifiable, ResourceType, IdType } from '../shared/shared-types';
import { BackendService } from './backend.service';
import { PRODUCTS_TOKEN } from './injection-tokens';
import { of, throwError } from 'rxjs';

@Injectable()
export class BackendMockService implements BackendService {
  private static nextId = 1;

  constructor(@Inject(PRODUCTS_TOKEN) private products: Identifiable[]) {
    this.products.forEach(p => p.id = BackendMockService.nextId++ + '');
  }

  findAll<T extends Identifiable>(type: ResourceType<T>): Observable<T[]> {
    const collection = this.getCollection(type.typeId);
    return of([...collection] as T[]);
  }

  findById<T extends Identifiable>(type: ResourceType<T>, id: IdType): Observable<T> {
    const entities = this.getCollection(type.typeId) as T[];
    const index = entities.findIndex(elem => elem.id === id);
    if (index >= 0) {
      return of(entities[index]);
    } else {
      return throwError(`${type.typeId} with ID='${id}' not found.`);
    }
  }
  create<T extends Identifiable>(type: ResourceType<T>, item: T): Observable<T> {
    item.id = BackendMockService.nextId++ + '';
    const collection = this.getCollection(type.typeId) as T[];
    collection.push(item);
    return of(item);
  }
  update<T extends Identifiable>(type: ResourceType<T>, item: T): Observable<T> {
    const entities = this.getCollection(type.typeId) as T[];
    const index = entities.findIndex(e => e.id === item.id);
    if (index >= 0) {
      entities[index] = item;
      return of(entities[index]);
    } else {
      return throwError(`${type.typeId} with ID='${item.id}' not found.`);
    }
  }
  delete<T extends Identifiable> (type: ResourceType<T>, id: IdType): Observable<T> {
    const entities = this.getCollection(type.typeId) as T[];
    const index = entities.findIndex(e => e.id === id);
    if (index >= 0) {
      const entity = entities.splice(index, 1)[0];
      return of(entity);
    } else {
      return throwError(`${type.typeId} with ID='${id}' not found.`);
    }
  }
  count<T extends Identifiable>(type: ResourceType<T>): Observable<number> {
    const entities = this.getCollection(type.typeId) as T[];
    return of(entities.length);
  }

  private getCollection(collectionName: string): Identifiable[] {
    switch (collectionName) {
      case 'Product': return this.products;
      // case 'User': return this.users;
    }
    return [];
  }

}
