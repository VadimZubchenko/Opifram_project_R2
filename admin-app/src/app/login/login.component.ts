import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorText: string | undefined;

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    console.log('Email:', email);
    console.log('Password:', password);

    this.errorText = 'Virheellinen sähköpostiosoite tai salasana.';
  }

  onFocus(): void {
    this.errorText = undefined;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
