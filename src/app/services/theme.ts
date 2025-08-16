import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly document = inject(DOCUMENT);

  private readonly _isDarkMode = signal<boolean>(
    localStorage.getItem('theme') === 'dark'
  );
  private readonly themeEff = effect(() => {
    if (this.isDarkMode()) {
      this.document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
  readonly isDarkMode = this._isDarkMode.asReadonly();

  toggle() {
    this._isDarkMode.update((prev) => !prev);
  }
}
