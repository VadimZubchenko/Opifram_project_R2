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
    const authToken: string = this.authService.getToken();
    return next.handle(request.clone({ setHeaders: { 'Content-Type': 'application/json', 'Authorization': authToken } }))
      .pipe(map((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          console.log('Event status:', event);
        }
        return event;
      }));
    
  }

  constructor(private authService: AuthService) {}
}
