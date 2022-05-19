import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this.http.post<LoggedUser>(`${environment.API_URI}/auth/login`, { email: email, password: password });
  }

  setUser(user: LoggedUser): void {
    this.user = user;
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('user');
    localStorage.removeItem('tabIndex');
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return this.user ? `Bearer ${this.user.token}` : '';
  }

  async autoLogin(): Promise<void> {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser: LoggedUser = JSON.parse(storedUser);

      //TODO: Verify token before assigning user
      this.user = parsedUser;
    }
  }

  constructor(private http: HttpClient, private router: Router) { }
}
