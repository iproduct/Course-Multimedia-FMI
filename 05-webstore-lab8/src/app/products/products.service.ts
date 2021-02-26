import { Injectable, Inject } from '@angular/core';
import { Product } from './product.model';
import { IdType } from '../shared/common-types';
import { BACKEND, BackendService } from '../core/backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(@Inject(BACKEND) private backend: BackendService) { }

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
