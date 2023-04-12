import { IdType } from './../shared/common-types';
import { Injectable } from '@angular/core';
import { ApiClientService } from '../core/api-client.service';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { Identifiable } from '../shared/common-types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiClient: ApiClientService) { }

  findAll(): Observable<Product[]> {
    return this.apiClient.findAll(Product);
  }

  findById(id: IdType): Observable<Product> {
    return this.apiClient.findById(Product, id);
  }

  create(entity: Product): Observable<Product> {
    return this.apiClient.create(Product, entity);
  }

  update(entity: Product): Observable<Product> {
    return this.apiClient.update(Product, entity);
  }

  deleteById(id: IdType): Observable<Product> {
    return this.apiClient.deleteById(Product, id);
  }
}
