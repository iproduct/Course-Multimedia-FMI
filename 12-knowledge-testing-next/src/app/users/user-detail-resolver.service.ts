/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';

@Injectable()
export class UserDetailResolver implements Resolve<User> {
  constructor(private cs: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id = route.paramMap.get('id');

    return this.cs.findUser(id).take(1).map(user => {
      if (user) {
        return user;
      } else { // id not found
        this.router.navigate(['/users']);
        return null;
      }
    });
  }
}
