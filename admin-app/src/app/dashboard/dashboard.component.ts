import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { DarkModeService } from '../common/services/dark-mode.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedIndex = '0';

  constructor(public authService: AuthService, public darkModeService: DarkModeService) { }

  ngOnInit(): void {
    const tabIndex = localStorage.getItem('tabIndex');
    if (tabIndex) {
      this.selectedIndex = tabIndex;
    }
  }
}
