import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class ConfirmService {

  confirm(message: string): Observable<boolean> {
    const dialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false });
    dialog.componentInstance.message = message;
    return dialog.afterClosed();
  }

  constructor(public dialog: MatDialog) { }
}
