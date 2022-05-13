import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  toggleDarkMode(): void {
    if (this.document.body.classList.contains('dark-theme')) {
      this.document.body.classList.remove('dark-theme');
    } else {
      this.document.body.classList.add('dark-theme');
    }
  };


  constructor(@Inject(DOCUMENT) private document: Document) { }
}
