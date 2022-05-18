import { Injectable } from '@angular/core';
import { ApiClientService } from '../core/api-client.service';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiClient: ApiClientService) { }

  findAll(): Observable<Product[]> {
    return this.apiClient.findAll(Product);
  }
}
