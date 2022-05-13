import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import { LoggedUser } from '../common/models/logged-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorText: string | undefined;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  onSubmit(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe({
      next: (v) => {
        this.authService.user = v;
        localStorage.setItem('user', JSON.stringify(v));
        this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        if (e.status === 401) {
          this.errorText = 'Virheellinen käyttäjätunnus tai salasana.';
        } else if (e.status === 500) {
          this.errorText = 'Tapahtui odottaman virhe. Yritä uudelleen.';
        }
      }
    });
  }

  onFocus(): void {
    this.errorText = undefined;
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

}