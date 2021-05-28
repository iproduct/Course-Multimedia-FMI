import { BackendMockService } from './../core/backend-mock.service';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { BackendService } from '../core/backend.service';
import { IdType } from '../shared/shared-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private backend: BackendService) { }

    findAll(): Observable<Product[]>{
      return this.backend.findAll(Product);
    }
    findById(id: IdType): Observable<Product> {
      return this.backend.findById(Product, id);
    }
    create(product: Product): Observable<Product>{
      return this.backend.create(Product, product);
    }
    update(product: Product): Observable<Product>{
      return this.backend.update(Product, product);
    }
    delete(id: IdType): Observable<Product>{
      return this.backend.delete(Product, id);
    }
    count(): Observable<number>{
      return this.backend.count(Product);
    }
}
