import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  show(message: string): void {
    this.snackbar.open(message, 'Sulje', { duration: 3000, panelClass: ['mat-toolbar', 'mat-accent'] });
  }

  constructor(public snackbar: MatSnackBar) { }
}
