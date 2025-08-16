import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixToDate',
})
export class UnixToDate implements PipeTransform {
  transform(unix: number) {
    const date = new Date(unix * 1000);

    return date;
  }
}
