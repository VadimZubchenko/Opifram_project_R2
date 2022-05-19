import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import { LoggedUser } from '../common/models/logged-user';
import { UserRole } from '../common/models/user-role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  errorText: string | undefined;
  loading = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  setLoading(loading: boolean) {
    if (loading) {
      this.errorText = undefined;
      this.loading = true;
    } else {
      this.loading = false;
    }
  }

  onSubmit(): void {
    this.setLoading(true);

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe({
      next: (user: LoggedUser): void => {
        if (user.role === UserRole.Admin) {
          this.authService.user = user;
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        } else {
          this.errorText = 'Sinulla ei ole oikeuksia kirjautua tälle sivulle.';
        }
        this.setLoading(false);
      },
      error: (e): void => {
        if (e.status === 401) {
          this.errorText = 'Virheellinen sähköpostiosoite tai salasana.';
        } else if (e.status === 500) {
          this.errorText = 'Tapahtui odottamaton virhe. Yritä uudelleen.';
        } else {
          this.errorText = 'Palvelin ei vastannut pyyntöön. Yritä myöhemmin uudelleen.';
        }
        this.setLoading(false);
      }
    });
  }

  clearError(): void {
    this.errorText = undefined;
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

}
