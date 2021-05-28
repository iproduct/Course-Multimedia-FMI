import { Component, OnInit } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { fromEvent, interval, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

interface Point {
  x: number,
  y: number
}


@Component({
  selector: 'ws-rx-demo',
  templateUrl: './rx-demo.component.html',
  styleUrls: ['./rx-demo.component.css']
})
export class RxDemoComponent implements OnInit {
  numbers = '';
  clicks$: Observable<[Point, Point]> = of();

  constructor() { }

  ngOnInit(): void {
    const numbers$ = of(10, 20, 30, 40, 50);
    const interval$ = interval(1000);

    zip(numbers$, interval$)
      .pipe(
        map(([n, i]) => n)
      )
      .subscribe(
        next => {
          this.numbers += next + ', ';
          console.log('next:', next)
        },
        err => {
          this.numbers += 'error';
          console.log('error:', err)
        },
        () => {
          this.numbers += 'completed';
          console.log('the end');
        }
      );

    // mouse hot event stream demo
    const documentEvent = (eventName: string) =>
      fromEvent<MouseEvent>(document, eventName).pipe(
        map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
      );

    this.clicks$ = zip(documentEvent('mousedown'), documentEvent('mouseup'));
  }

}
