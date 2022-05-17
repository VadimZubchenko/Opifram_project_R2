import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURI } from 'src/config';
import { User } from '../models/user';
import { UserRole } from '../models/user-role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${apiURI}/user`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${apiURI}/user/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${apiURI}/user/${user.id}`, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${apiURI}/user/${user.id}`);
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
