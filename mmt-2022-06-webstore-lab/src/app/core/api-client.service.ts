import { Identifiable, ResourceType } from './../shared/common-types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

const API_BASE_URL = 'http://localhost:9000/api'

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private http: HttpClient) { }

  findAll<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]> {
    return this.http.get<T[]>(`${API_BASE_URL}/${this.getUrl(kind.typeId)}`)
      .pipe(
        tap({error: err => console.log('API CLient error: ' + JSON.stringify(err))}),
        retry({count: 3, delay: 1000}),
        catchError(this.handleError)
      );
  }

  protected handleError(error: HttpErrorResponse) {
   console.error(error);
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:' + error.error.message);
    } else {
      // Backend unsuccessful status code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error || error)},
        message was: ${JSON.stringify(error.message)}`);
    }
    // return ErrorObservable with a user-facing error message
    return throwError(() => `Error performing the operation: ${error.message ? error.message : ''}. Correct data and try again.`);
  }

  private getUrl(typeId: string) {
    return typeId.toLowerCase() + "s";
  }
}
