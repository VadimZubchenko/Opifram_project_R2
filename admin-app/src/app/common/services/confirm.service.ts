import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  confirm(message: string): Observable<boolean> {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, { disableClose: false });
    this.dialogRef.componentInstance.message = message;
    return this.dialogRef.afterClosed();
  }

  constructor(public dialog: MatDialog) { }
}
