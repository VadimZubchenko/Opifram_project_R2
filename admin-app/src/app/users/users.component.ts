import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../common/models/user';
import { ConfirmService } from '../common/services/confirm.service';
import { SnackbarService } from '../common/services/snackbar.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  title = 'Käyttäjät';
  users: User[];
  errorText: string;

  onSearch(users: Observable<User[]>): void {
    users.subscribe(users => this.users = users);
  }

  constructor(public userService: UserService, private dialog: MatDialog, private snackbarService: SnackbarService, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        this.errorText = 'Tietoja ei voitu hakea';
      }
    });
  }

}
