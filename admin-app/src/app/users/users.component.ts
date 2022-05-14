import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../common/models/user';
import { UserService } from '../common/services/user.service';

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

  onCreate(): void {
  }

  onEdit(): void {

  }

  onDelete(): void {

  }

  onShow(): void {

  }

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

}
