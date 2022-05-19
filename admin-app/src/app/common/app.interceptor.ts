import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredDialogComponent } from '../session-expired-dialog/session-expired-dialog.component';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  handleSessionExpired(): void {
    this.dialog.open(SessionExpiredDialogComponent, { disableClose: true }).afterClosed().subscribe(() => {
      this.authService.logout();
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({ setHeaders: { 'Content-Type': 'application/json', 'Authorization': this.authService.getToken() } }))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 419) {
            this.handleSessionExpired();
          }
          return throwError(error);
        })
      );
    
  }

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {}
}
