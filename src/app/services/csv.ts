import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Csv {
  // TODO learn how to read from csv
  downloadCSV<T extends object>(list: T[], title: string) {
    const headers = Object.keys(list[0]);

    const rows = list.map((obj) => Object.values(obj));

    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  }
}
