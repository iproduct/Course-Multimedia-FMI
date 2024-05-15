import { PostDetailComponent } from './posts/components/post-detail/post-detail.component';
import { Routes } from '@angular/router';
import { PostListComponent } from './posts/components/post-list/post-list.component';
import { WikiComponent } from './wiki/wiki.component';
import { RxDemoComponent } from './rxdemo/rx-demo/rx-demo.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    component: PostListComponent,
    children: [
      { path: ':postId', component: PostDetailComponent },
      { path: ':postId/:mode', component: PostDetailComponent },
    ]
  },
  { path: 'wiki', component: WikiComponent },
  { path: 'rxdemo', component: RxDemoComponent },
  { path: 'simple-form', component: SimpleFormComponent },
];
