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
  loginButtonText: string = 'Kirjaudu sisään';
  loading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  setLoading(loading: boolean) {
    if (loading) {
      this.errorText = undefined;
      this.loading = true;
      this.loginButtonText = 'Ladataan...';
    } else {
      this.loading = false;
      this.loginButtonText = 'Kirjaudu sisään';
    }
  }

  onSubmit(): void {
   this.setLoading(true);

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe({
      next: (v): void => {
        if (v.role === 'user') {
          this.errorText = 'Pääsy evätty';
        } else {
          this.authService.user = v;
          localStorage.setItem('user', JSON.stringify(v));
          this.router.navigate(['/dashboard']);
        }
        this.setLoading(false);
      },
      error: (e): void => {
        if (e.status === 401) {
          this.errorText = 'Virheellinen sähköpostiosoite tai salasana.';
        } else if (e.status === 500) {
          this.errorText = 'Tapahtui odottaman virhe. Yritä uudelleen.';
        }
        this.setLoading(false);
      }
    });
  }

  onFocus(): void {
    this.errorText = undefined;
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

}
