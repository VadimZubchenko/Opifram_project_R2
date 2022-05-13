import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap, catchError } from 'rxjs';
import { apiURI } from 'src/config';
import { LoggedUser } from '../models/logged-user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  user: LoggedUser | undefined;

  isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  login(email: string, password: string): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${apiURI}/auth/login`, { email: email, password: password }, this.httpOptions);
  }

  setUser(user: LoggedUser): void {
    this.user = user;
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  autoLogin(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser: LoggedUser = JSON.parse(storedUser);
      this.user = parsedUser;
    }
  }

  constructor(private http: HttpClient, private router: Router) { }
}
