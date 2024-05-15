import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from './core/core.module';
import { PostsModule } from './posts/posts.module';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleFormModule } from './simple-form/simple-form.module';
import { CommonModule } from '@angular/common';
import { RxdemoModule } from './rxdemo/rxdemo.module';
import { WikiModule } from './wiki/wiki.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'bl-root',
  standalone: true,
  imports: [CommonModule, CoreModule, PostsModule, MatToolbarModule, FlexLayoutModule, SimpleFormModule,
    RxdemoModule,  WikiModule,  RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular Blogs Demo';
  currentView = "blogs";

  showView(view: string) {
    this.currentView = view;
  }
}
