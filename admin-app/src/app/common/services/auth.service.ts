import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  login(email: string, password: string): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${apiURI}/auth/login`, { email: email, password: password }, this.httpOptions);
  }

  logout(): void {
    this.user = undefined;
  }

  constructor(private http: HttpClient) { }
}
