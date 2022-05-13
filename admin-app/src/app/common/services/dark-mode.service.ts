import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  toggleDarkMode(): void {
    if (this.document.body.classList.contains('dark-theme')) {
      this.document.body.classList.remove('dark-theme');
      localStorage.setItem('mode', 'light');
    } else {
      this.document.body.classList.add('dark-theme');
      localStorage.setItem('mode', 'dark');
    }
  };

  enableIfSaved(): void {
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      if (savedMode === 'dark') {
        this.document.body.classList.add('dark-theme');
      } else {
        this.document.body.classList.remove('dark-theme');
      }
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) { }
}
