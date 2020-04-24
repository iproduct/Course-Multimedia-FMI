import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, from, interval, zip, fromEvent, Subscription } from 'rxjs';
import { map, startWith, endWith, scan, debounceTime, buffer } from 'rxjs/operators';

@Component({
  selector: 'ws-rx-demo',
  templateUrl: './rx-demo.component.html',
  styleUrls: ['./rx-demo.component.css']
})
export class RxDemoComponent implements OnInit, OnDestroy, AfterViewInit {
  names$: Observable<string>;
  asyncNames$: Observable<string>;
  interval$: Observable<number>;
  clickCount$: Observable<number>;
  nClicks$: Observable<string>;
  @ViewChild('clickable') clickSource: ElementRef;
  subscription: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.names$ = from([
      'Hello', 'Reactive', 'Extensions', 'from', 'TypeScript'
    ]);

    this.interval$ = interval(1000);

    this.subscription = this.interval$.subscribe(
      next => console.log(next),
    );

    this.asyncNames$ = zip(this.names$, this.interval$).pipe(
      map(([name, n]) => `${n + 1}. ${name}`),
      endWith('In the end.'),
      startWith('In the beginnig ...'),
      scan((old, val) => `${old} | ${val}`, ''),
    );
  }

  ngAfterViewInit(): void {
    const clicks$ = fromEvent(this.clickSource.nativeElement, 'click');
    this.clickCount$ = clicks$.pipe(
      scan((acc, ev) => acc + 1, 0),
      startWith(0)
    );
    this.nClicks$ = clicks$.pipe(
      buffer(clicks$.pipe(debounceTime(200))),
      map(events => events.length),
      scan((old, val) => `${old} | ${val}`, ''),
    );
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

}
