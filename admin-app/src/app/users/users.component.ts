import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogOpenAction } from '../common/models/dialog-open-action';
import { User } from '../common/models/user';
import { ConfirmService } from '../common/services/confirm.service';
import { SnackbarService } from '../common/services/snackbar.service';
import { UserService } from '../common/services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  selectedUser: User;

  displayedColumns: string[] = ['name', 'email', 'role', 'id'];

  getUsers(): void {
    this.users$ = this.userService.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  onEdit(): void {
    this.dialog
      .open(UserDialogComponent, { data: { action: DialogOpenAction.Open, item: this.selectedUser } })
      .afterClosed()
      .subscribe((user: User) => {
        if (user) {
          this.userService.updateUser(user)
            .subscribe({
              next: () => {
                this.getUsers();
                this.snackbarService.show('Käyttäjän muokkaaminen onnistui.');
              },
              error: (e) => {
                this.snackbarService.show('Käyttäjän muokkaaminen epäonnistui.');
                console.error(e);
              }
            });
        }
      })
    ;
  }

  onDelete(): void {
    this.confirmService.confirm('Vahvista käyttäjän poistaminen.')
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.userService.deleteUser(this.selectedUser)
            .subscribe({
              next: () => {
                this.getUsers();
                this.snackbarService.show('Käyttäjän poistaminen onnistui.');
              },
              error: (e) => {
                this.snackbarService.show('Käyttäjän poistaminen epäonnistui.');
                console.error(e);
              }
            });
        }
      });
  }

  constructor(private userService: UserService, private dialog: MatDialog, private snackbarService: SnackbarService, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.getUsers();
  }

}
