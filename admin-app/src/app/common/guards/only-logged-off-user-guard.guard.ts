import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedUser } from '../models/logged-user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedOffUserGuardGuard implements CanActivate {
  canActivate() {
    
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
  constructor(private authService: AuthService, private router: Router) { }

}
