import { Injectable, Inject, inject } from '@angular/core';
import { Post } from '../model/post-model';
import { Observable } from 'rxjs';
import { IdType } from '../../shared/shared-types';
import { API, ApiClientHttpService, ApiClientService } from '../../core/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(@Inject(API) private backend: ApiClientService) {}

  findAll(): Observable<Post[]> {
    return this.backend.findAll(Post);
  }
  findById(id: IdType): Observable<Post> {
    return this.backend.findById(Post, id);
  }
  create(entity: Post): Observable<Post> {
    return this.backend.create(Post, entity);
  }
  update(entity: Post): Observable<Post> {
    return this.backend.update(Post, entity);
  }
  deleteById(id: IdType): Observable<Post> {
    return this.backend.deleteById(Post, id);
  }

}
