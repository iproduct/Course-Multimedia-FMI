import { InjectionToken } from '@angular/core';
import { EntityConstructor, Identifiable, IdType } from '../shared/shared-types';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { retryAfter } from '../shared/rx-operators';
import { LoggerService } from './logger.service';

export const BASE_API_URL = 'http://localhost:9000';

export const ENTITY_TO_URL_MAP: { [index: string]: string } = {
  'Post': 'posts',
  'User': 'users',
}

export const API = new InjectionToken<ApiClientService>('ApiClientService');

export interface ApiClientService {
  findAll<T extends Identifiable<IdType>>(type: EntityConstructor<T>): Observable<T[]>;
  findById<T extends Identifiable<IdType>>(type: EntityConstructor<T>, id: IdType): Observable<T>;
  create<T extends Identifiable<IdType>>(type: EntityConstructor<T>, entity: T): Observable<T>;
  update<T extends Identifiable<IdType>>(type: EntityConstructor<T>, entity: T): Observable<T>;
  deleteById<T extends Identifiable<IdType>>(type: EntityConstructor<T>, id: IdType): Observable<T>;
}

@Injectable()
export class ApiClientHttpService implements ApiClientService {

  constructor(private http: HttpClient, private logger: LoggerService) { }

  findAll<T extends Identifiable<IdType>>(type: EntityConstructor<T>): Observable<T[]> {
    return this.http.get<T[]>(`${BASE_API_URL}/${this.getUrl(type)}`)
      .pipe(
        tap({ error: err => this.logger.error(err) }),
        retryAfter(3, 1000),
        catchError(this.handleError)
      );
  }
  findById<T extends Identifiable<IdType>>(type: EntityConstructor<T>, id: IdType): Observable<T> {
    return this.http.get<T>(`${BASE_API_URL}/${this.getUrl(type)}/${id}`)
      .pipe(
        retryAfter(3, 1000),
        catchError(this.handleError)
      );
  }
  create<T extends Identifiable<IdType>>(type: EntityConstructor<T>, entity: T): Observable<T> {
    return this.http.post<T>(`${BASE_API_URL}/${this.getUrl(type)}`, {... entity, id: undefined})
      .pipe(
        tap({
          next: created => this.logger.log(`${type.className} created: ${JSON.stringify(created)}`),
          error: err => this.logger.error(err)
        }),
        catchError(this.handleError)
      );
  }
  update<T extends Identifiable<IdType>>(type: EntityConstructor<T>, entity: T): Observable<T> {
    return this.http.put<T>(`${BASE_API_URL}/${this.getUrl(type)}/${entity.id}`, entity)
      .pipe(
        tap({
          next: updated => this.logger.log(`${type.className} updated: ${JSON.stringify(updated)}`),
          error: err => this.logger.error(err)
        }),
        catchError(this.handleError)
      );
  }
  deleteById<T extends Identifiable<IdType>>(type: EntityConstructor<T>, id: IdType): Observable<T> {
    return this.http.delete<T>(`${BASE_API_URL}/${this.getUrl(type)}/${id}`)
      .pipe(
        tap({
          next: deleted => this.logger.log(`${type.className} deleted: ${JSON.stringify(deleted)}`),
          error: err => this.logger.error(err)
        }),
        retryAfter(3, 1000),
        catchError(this.handleError)
      );
  }

  protected getUrl<T extends Identifiable<IdType>>(type: EntityConstructor<T>): string {
    return ENTITY_TO_URL_MAP[type.className];
  }

  protected handleError(error: HttpErrorResponse) {
    this.logger.error(error);
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      this.logger.error('Client-side error:' + error.error.message);
    } else {
      // Backend unsuccessful status code.
      this.logger.error(
        `Backend returned code ${error.status}: ${error.statusText},
        body was: ${JSON.stringify(error.error || error)},
        message was: ${JSON.stringify(error.message)}`);
    }
    // return ErrorObservable with a user-facing error message
    return throwError(() => `Error performing the operation: ${error.message ? error.message : ''}. Correct data and try again.`);
  }

}




