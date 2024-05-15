import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { from, Observable, interval, zip, Subscription, fromEvent } from 'rxjs';
import { map, endWith, startWith, scan, debounceTime, buffer } from 'rxjs/operators';

@Component({
  selector: 'bp-rx-demo',
  templateUrl: './rx-demo.component.html',
  styleUrls: ['./rx-demo.component.css']
})
export class RxDemoComponent implements OnInit, OnDestroy {

  names$: Observable<string> | undefined;
  interval$: Observable<number> | undefined;
  asyncNames$: Observable<string> | undefined;
  clickCount$: Observable<number> | undefined;
  nClicks$: Observable<string> | undefined;
  values = '';
  errors = '';
  number: number | undefined;
  subscription: Subscription | undefined;
  @ViewChild('clickable', {static: true}) clickSource: ElementRef | undefined;

  constructor() { }

  ngOnInit() {
    this.names$ = from([
      'Hello', 'Reactive', 'Extensions', 'from', 'TypeScript'
    ]);

    this.interval$ = interval(1000);

    this.asyncNames$ = zip(this.names$, this.interval$)
      .pipe(
        map(([name, n]) => name + ' ' + n),
        endWith('In the end.'),
        startWith('In the begining ...')
      );

    this.subscription = this.interval$.subscribe(n => this.number = n);

    const custom$ = new Observable(subscriber => {
      subscriber.next('first');
      subscriber.next('second');
      subscriber.next('third');
      setTimeout(() => {
        subscriber.next('forth');
      }, 1000);
      setTimeout(() => {
        subscriber.next('fifth'),
        subscriber.complete();
        // subscriber.error('Error in custom Observable!');
      }, 3000);
    });

    custom$.subscribe({
      next: next => this.values += next + ', ',
      error: err => this.values += err,
      complete: () => this.values += 'COMPLETED.'
  });

    const clicks$ = fromEvent(this.clickSource?.nativeElement, 'click');
    this.clickCount$ = clicks$.pipe(
      scan((acc, ev) => acc + 1, 0)
    );

    this.nClicks$ = clicks$.pipe(
      buffer(clicks$.pipe(debounceTime(200))),
      map(events => events.length + ''),
      scan((acc, nClicks) => acc + ', ' + nClicks, '')
    );


  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
