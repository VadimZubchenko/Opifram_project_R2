import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from '../common/services/auth.service';
import { DarkModeService } from '../common/services/dark-mode.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedIndex = '0';

  onTabChange(event: MatTabChangeEvent) {
    this.selectedIndex = event.index.toString();
    localStorage.setItem('tabIndex', this.selectedIndex);
  }

  constructor(public authService: AuthService, public darkModeService: DarkModeService) { }

  ngOnInit(): void {
    const tabIndex = localStorage.getItem('tabIndex');
    if (tabIndex) {
      this.selectedIndex = tabIndex;
    }
  }
}
