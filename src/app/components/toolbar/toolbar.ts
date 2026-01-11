import { Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Button } from '../button/button';
import { Theme } from '../../services/theme';
import { Excel } from '../../services/excel';

@Component({
  selector: 'wify-toolbar',
  imports: [MatToolbarModule, Button],
  styleUrl: './toolbar.scss',
  template: `
    <mat-toolbar>
      <span>Who Isn't Following You</span>
      <span class="example-spacer"></span>
      <wify-button
        type="icon"
        [icon]="icon()"
        (clicked)="toggleColorScheme()"
      />
    </mat-toolbar>
  `,
})
export class Toolbar {
  private readonly theme = inject(Theme);
  readonly #csv = inject(Excel);

  protected icon = computed(() =>
    this.theme.isDarkMode() ? 'light_mode' : 'dark_mode'
  );

  protected toggleColorScheme() {
    this.theme.toggle();
    this.#csv.generateExcel(
      [
        { name: 'John', age: 28, country: 'USA' },
        { name: 'Ana', age: 22, country: 'Spain' },
        { name: 'Lee', age: 31, country: 'South Korea' },
      ],
      'this.title().toUpperCase()'
    );
  }
}
