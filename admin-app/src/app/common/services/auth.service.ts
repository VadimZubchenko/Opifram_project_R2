import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiURI, baseHttpOptions } from 'src/config';
import { LoggedUser } from '../models/logged-user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: LoggedUser | undefined;

  isLoggedIn(): boolean {
    if (this.user) {
      return true;
    }
    return false;
  }

  login(email: string, password: string): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${apiURI}/auth/login`, { email: email, password: password }, baseHttpOptions);
  }

  setUser(user: LoggedUser): void {
    this.user = user;
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  autoLogin(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser: LoggedUser = JSON.parse(storedUser);
      if (parsedUser.role === 'admin') {
        this.user = parsedUser;
      }
    }
  }

  constructor(private http: HttpClient, private router: Router) { }
}
