import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Wify } from '../services/wify';

@Directive({
  selector: '[avatarBackground]',
})
export class AvatarBackgroundDirective {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly wify = inject(Wify);

  readonly avatarBackground = input<string>();

  private readonly avatarBackgroundEffect = effect(() => {
    const username = this.avatarBackground();

    if (username) {
      const letter = this.wify.getFirstLetter(username).toUpperCase();
      const color = this.wify.getColorForLetter(letter);
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    }
  });
}
