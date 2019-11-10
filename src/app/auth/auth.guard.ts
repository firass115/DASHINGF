import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../shared/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: AccountService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('token') != null) {
      const key = 'permittedRoles';
      const roles = next.data[key] as Array<string>;
      if (roles) {
        if (this.service.roleMatch(roles)) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
