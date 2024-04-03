import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'td-root',
  standalone: true,
  imports: [RouterOutlet],
  template: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'fmi-2024-04-ng-todos';
  ngOnInit(): void {
  }


}
