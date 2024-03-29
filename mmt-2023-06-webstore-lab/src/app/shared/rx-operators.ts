
import { delay, retry, scan } from 'rxjs/operators';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export function retryAfter<T>(
  count: number,
  wait: number
):  MonoTypeOperatorFunction<T> { //(source: Observable<T>) => Observable<T>

  return retry({delay: errors => errors.pipe(
    // Each time an error occurs, increment the accumulator.
    // When the maximum number of retries have been attempted, throw the error.
    scan((acc, error) => {
      if (acc >= count) { throw error; }
      return acc + 1;
    }, 0),
    // Wait the specified number of milliseconds between retries.
    delay(wait)
  )});
}
