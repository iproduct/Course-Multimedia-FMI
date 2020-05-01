import { Identifiable, ResourceType, IdType } from '../shared/shared-types';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const BACKEND_SERVICE = new InjectionToken<BackendService>('BackendService');

export interface BackendService {
  findAll<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]>;
  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T>;
  create<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T>;
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T>;
  deleteById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T>;
}
