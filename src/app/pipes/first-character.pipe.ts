import { inject, Pipe, PipeTransform } from '@angular/core';
import { Wify } from '../services/wify';

@Pipe({
  name: 'firstCharacter',
})
export class FirstCharacter implements PipeTransform {
  private readonly wify = inject(Wify);

  transform(username: string): string {
    const firstLetter = this.wify.getFirstLetter(username);

    return firstLetter.toUpperCase();
  }
}
