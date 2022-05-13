import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  setLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  };

  login(email: string, password: string): void {

  }

  constructor() { }
}
