import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  isDarkMode(): boolean {
    if (this.document.body.classList.contains('dark-theme')) {
      return true;
    }
    return false;
  }

  toggleDarkMode(): void {
    const classList = this.document.body.classList;
    if (classList.contains('dark-theme')) {
      classList.remove('dark-theme');
      localStorage.setItem('mode', 'light');
    } else {
      classList.add('dark-theme');
      localStorage.setItem('mode', 'dark');
    }
  }

  enableIfSaved(): void {
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      const classList = this.document.body.classList;
      if (savedMode === 'dark') {
        classList.add('dark-theme');
      } else {
        classList.remove('dark-theme');
      }
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) { }
}
