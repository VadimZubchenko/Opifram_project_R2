import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { DarkModeService } from '../common/services/dark-mode.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tab = 'Tuotteet';

  constructor(public authService: AuthService, public darkModeService: DarkModeService) { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
}
