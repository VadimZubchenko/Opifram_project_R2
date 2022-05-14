import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../common/models/dialog-data';
import { User } from '../common/models/user';
import { UserRole } from '../common/models/user-role';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  user: User = this.data.item as User;
  roles: UserRole[] = Object.values(UserRole);

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(this.user?.firstName, [Validators.required]),
    lastName: new FormControl(this.user?.lastName, [Validators.required]),
    email: new FormControl(this.user?.email, [Validators.required]),
    phone: new FormControl(this.user?.phone, [Validators.required]),
    address: new FormControl(this.user?.address, [Validators.required]),
    role: new FormControl(this.user?.role, [Validators.required]),
    id: new FormControl(this.user?.id)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
