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

  ngOnInit(): void {}
}
