import { Component, input, output } from '@angular/core';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonType } from '../../model/button.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HoverElevationDirective } from '../../directives/hover-elevation.directive';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    HoverElevationDirective,
  ],
  selector: 'wify-button',
  templateUrl: './button.html',
})
export class Button {
  readonly type = input<ButtonType>();
  readonly appearance = input<MatButtonAppearance | ''>('');
  readonly text = input<string>('');
  readonly tooltip = input<string>('');
  readonly icon = input<string>('');
  readonly elevateOnHover = input<boolean>(false);
  readonly isDisabled = input<boolean>(false);

  readonly clicked = output<void>();

  protected onClick(): void {
    this.clicked.emit();
  }
}
