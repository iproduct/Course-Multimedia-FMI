import { CoreModule } from './core/core.module';
import { PostsModule } from './posts/posts.module';
import { Component } from '@angular/core';

@Component({
  selector: 'bl-root',
  standalone: true,
  imports: [CoreModule, PostsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular Blogs Demo';
}
