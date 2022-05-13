import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedOffUserGuardGuard implements CanActivate {
  canActivate() {

    if (!this.authService.isLoggedIn()) {
      return true;
    }
    
    this.router.navigate(['/dashboard']);
    return false;
  }
  constructor(private authService: AuthService, private router: Router) { }

}
