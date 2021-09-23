import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdm1Guard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        console.log(this.authService.isLoggedAdm())
      if (this.authService.isLoggedAdm()) {
          this.router.navigate([''])
          return false
        }
    return true;
  }
  
}
