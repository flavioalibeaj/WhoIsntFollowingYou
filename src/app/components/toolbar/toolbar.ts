import { Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Button } from '../button/button';
import { Theme } from '../../services/theme';

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

  protected icon = computed(() =>
    this.theme.isDarkMode() ? 'light_mode' : 'dark_mode'
  );

  protected toggleColorScheme() {
    this.theme.toggle();
  }
}
