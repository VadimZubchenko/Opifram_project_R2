import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({ setHeaders: { 'Content-Type': 'application/json', 'Authorization': this.authService.getToken() } }))
      .pipe(map((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 419) {
            //TODO: Show expired session dialog, force logout
            //this.authService.logout();
          }
        }
        return event;
      }));
    
  }

  constructor(private authService: AuthService) {}
}
