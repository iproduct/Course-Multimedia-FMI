import {map, catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Product from './product.model';
import { PRODUCTS } from './mock-data';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const API_URL = `/api`;

export interface ProductsResponse {
  data: Product[];
}

export interface ProductResponse {
  data: Product;
}

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]> {
    const productsUrl = `${API_URL}/products`;
    return this.http.get<ProductsResponse>(productsUrl).pipe(
      map(resp => resp.data),
      catchError(this.handleError)
    );
  }

  create(product: Product): Observable<Product> {
    const productsUrl = `${API_URL}/products`;
    return this.http.post<ProductResponse>(productsUrl, product).pipe(
      map(resp => resp.data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend unsuccessful status code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)},
        message was: ${JSON.stringify(error.message)}`);
    }
    // return ErrorObservable with a user-facing error message
    return new ErrorObservable('Error performing the operation. Correct data and try again.');
  }

}
