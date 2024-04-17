
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

export function retryAfter<T>(
  count: number,
  wait: number
): (source: Observable<T>) => Observable<T> {

  return retry({count, delay: wait})
}
