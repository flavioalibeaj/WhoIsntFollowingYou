import { inject, Pipe, PipeTransform } from '@angular/core';
import { Wify } from '../services/wify';

@Pipe({
  name: 'unixToDate',
})
export class UnixToDate implements PipeTransform {
  readonly #wify = inject(Wify);

  transform(unix: number): Date {
    return this.#wify.getDateFromUnix(unix);
  }
}
