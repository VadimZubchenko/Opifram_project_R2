import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
export class UserTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() users: User[];
  selectedUser: User;

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  setPaginator(): void {
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
  }

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
                this.setPaginator();
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
                this.setPaginator();
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setPaginator();
  }

  ngOnChanges(): void {
    this.setPaginator();
  }

}
