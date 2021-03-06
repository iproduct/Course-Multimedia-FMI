import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindBookPageComponent } from '../books/containers/find-book-page.component';
import { ViewBookPageComponent } from '../books/containers/view-book-page.component';
import { CollectionPageComponent } from '../books/containers/collection-page.component';
import { BookExistsGuard } from '../books/guards/book-exists.guard';

export const routes: Routes = [
  { path: 'find', component: FindBookPageComponent },
  {
    path: ':id',
    component: ViewBookPageComponent,
    canActivate: [BookExistsGuard],
  },
  { path: '', component: CollectionPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
