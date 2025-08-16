import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[elevateOnHover]',
})
export class HoverElevationDirective implements OnInit {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly elevateOnHover = input<boolean>();

  ngOnInit() {
    if (this.elevateOnHover()) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition',
        'transform 0.3s ease-out'
      );
    }
  }

  @HostListener('mouseenter')
  elevate() {
    if (this.elevateOnHover()) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translate(0, -5px)'
      );
    }
  }

  @HostListener('mouseleave')
  lower() {
    if (this.elevateOnHover()) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translate(0, 0)'
      );
    }
  }
}
