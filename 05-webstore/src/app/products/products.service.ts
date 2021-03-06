import { Inject, Injectable } from '@angular/core';
import { Product } from './products.model';
import { IdType } from '../shared/shared-types';
import { BACKEND_SERVICE, BackendService } from '../core/backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(@Inject(BACKEND_SERVICE) private backend: BackendService) { }

  findAll(): Observable<Product[]> {
    return this.backend.findAll(Product);
  }

  findById(id: IdType): Observable<Product> {
    return this.backend.findById(Product, id);
  }

  create(entity: Product): Observable<Product> {
    return this.backend.create(Product, entity);
  }

  update(entity: Product): Observable<Product> {
    return this.backend.update(Product, entity);
  }

  deleteById(id: IdType): Observable<Product> {
    return this.backend.deleteById(Product, id);
  }

}
