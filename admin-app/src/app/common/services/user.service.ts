import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserRole } from '../models/user-role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URI}/user`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URI}/user/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.API_URI}/user/${user.id}`, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${environment.API_URI}/user/${user.id}`);
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term) { return this.getUsers(); }
    return this.http.post<User[]>(`${environment.API_URI}/user/search`, { term: term });
  }

  formatRole(role: UserRole): string { 
    switch(role) {
    case UserRole.Admin:
      return 'Ylläpitäjä';
    case UserRole.User:
      return 'Käyttäjä';
    }
  }

  constructor( private http: HttpClient, private authService: AuthService) { }
}
