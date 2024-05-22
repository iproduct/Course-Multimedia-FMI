/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { take, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PostsService } from './services/posts.service';
import { Post } from './model/post-model';

export const postResolver: ResolveFn<Post | undefined> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PostsService).findById(route.paramMap.get('postId')!).pipe(
      take(1),
      catchError(() => {
        return throwError(() => `Product with ID:${route.paramMap.get('postId')} not found.`);
      })
    );
  };
