import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken: string = this.authService.getToken();
    return next.handle(request.clone({ setHeaders: { 'Content-Type': 'application/json', 'Authorization': authToken } }));
  }

  constructor(private authService: AuthService) {}
}
