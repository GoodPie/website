import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service';
import {loggedIn} from '@angular/fire/auth-guard';
import {map, take, tap} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.auth.user$.pipe(
      take(1),
      map(user => _.has(_.get(user, 'roles'), 'admin')),
      tap(authorized => {
        if (!authorized) {
          console.log('Access Denied');
          this.router.navigate(['/login']);
        }
      })
    );
  }

}
