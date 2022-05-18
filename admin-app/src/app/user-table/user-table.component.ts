import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpenAction } from '../common/models/dialog-open-action';
import { User } from '../common/models/user';
import { ConfirmService } from '../common/services/confirm.service';
import { SnackbarService } from '../common/services/snackbar.service';
import { UserService } from '../common/services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @Input() users: User[];
  selectedUser: User;

  displayedColumns: string[] = ['name', 'email', 'role', 'id'];


  onSelect(user: User): void {
    this.selectedUser = user;
  }

  onEdit(): void {
    this.dialog
      .open(UserDialogComponent, { data: { action: DialogOpenAction.Edit, item: this.selectedUser } })
      .afterClosed()
      .subscribe((user: User) => {
        if (user) {
          this.userService.updateUser(user)
            .subscribe({
              next: (updatedUser) => {
                this.users = this.users.map(user => user.id === updatedUser.id ? updatedUser : user);
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
              next: (deletedUser) => {
                this.users = this.users.filter(user => user.id !== deletedUser.id);
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

  constructor(public userService: UserService, private dialog: MatDialog, private snackbarService: SnackbarService, private confirmService: ConfirmService) { }

  ngOnInit(): void {
  }

}
