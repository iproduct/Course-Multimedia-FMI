import { TodoService } from './todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular TODOs Demo';
  constructor(private todoService: TodoService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
