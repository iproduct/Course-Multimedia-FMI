import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'What to do next with Angular?';

  ngOnInit(): void {
    setTimeout(() => { this.title = 'Any Ideas?'; }, 5000);
  }
}


