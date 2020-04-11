
import { PROMISE_BACKEND, PromiseBackendService } from '../core/promise-backend.service';
import { Inject, Injectable } from '@angular/core';
import { Product } from './products.model';
import { IdType } from '../shared/shared-types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(@Inject(PROMISE_BACKEND) private backend: PromiseBackendService) { }

  findAll(): Promise<Product[]> {
    return this.backend.findAll(Product);
  }

  findById(id: IdType): Promise<Product> {
    return this.backend.findById(Product, id);
  }

  create(entity: Product): Promise<Product> {
    return this.backend.create(Product, entity);
  }

  update(entity: Product): Promise<Product> {
    return this.backend.update(Product, entity);
  }

  deleteById(id: IdType): Promise<Product> {
    return this.backend.deleteById(Product, id);
  }

}
