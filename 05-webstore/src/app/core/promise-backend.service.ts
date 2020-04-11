import { Identifiable, ResourceType, IdType } from '../shared/shared-types';
import { InjectionToken } from '@angular/core';

export const PROMISE_BACKEND = new InjectionToken<PromiseBackendService>('PromiseBackendService');

export interface PromiseBackendService {
  findAll<T extends Identifiable>(kind: ResourceType<T>): Promise<T[]>;
  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T>;
  create<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T>;
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T>;
  deleteById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T>;
}
