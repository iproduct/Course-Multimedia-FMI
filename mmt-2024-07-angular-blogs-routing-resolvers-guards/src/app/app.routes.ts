import { PostDetailComponent } from './posts/components/post-detail/post-detail.component';
import { Routes } from '@angular/router';
import { PostListComponent } from './posts/components/post-list/post-list.component';
import { WikiComponent } from './wiki/wiki.component';
import { RxDemoComponent } from './rxdemo/rx-demo/rx-demo.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { postResolver } from './posts/post-resolver';
import { title } from 'process';
import { canDeactivateGuard } from './core/can-deactivate-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    component: PostListComponent,
    children: [
      {
        path: 'create',
        pathMatch: 'full',
        component: PostDetailComponent,
        canDeactivate: [canDeactivateGuard],
        data: {
          title: 'Add New Post',
          mode: 'edit'
        }
      },
      {
        path: ':postId',
        component: PostDetailComponent,
        data: {
          title: 'Blog Details',
          mode: 'present'
        },
        resolve: {
          post: postResolver
        }
      },
      {
        path: ':postId/edit',
        component: PostDetailComponent,
        canDeactivate: [canDeactivateGuard],
        data: {
          title: 'Edit Post',
          mode: 'edit'
        },
        resolve: {
          post: postResolver
        }
      }
    ]
  },
  { path: 'wiki', component: WikiComponent },
  { path: 'rxdemo', component: RxDemoComponent },
  { path: 'simple-form', component: SimpleFormComponent },
];
