import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { jsPDF } from 'jspdf';
import { UserData } from '../model/user-data.type';
import { Wify } from './wify';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class Pdf {
  readonly #wify = inject(Wify);
  readonly #locale = inject(LOCALE_ID);

  // TODO make it generic
  generatePdf(list: UserData[], title: string) {
    const doc = new jsPDF();

    doc.text(title, 10, 10);

    const startY = 30;
    const headers = ['Username', 'Started Following At', 'Link'];
    const data = list.map(({ href, timestamp, value }) => {
      const dateFromUnix = this.#wify.getDateFromUnix(timestamp);
      const date = formatDate(dateFromUnix, 'mm-dd-yyyy', this.#locale);

      return [`${value}`, `${date}`, `${href}`];
    });

    headers.forEach((header, i) => {
      doc.text(header, 14 + i * 40, startY);
    });

    data.forEach((row, rowIndex) => {
      const y = startY + (rowIndex + 1) * 10;
      row.forEach((cell, i) => {
        doc.text(cell.toString(), 14 + i * 40, y);
      });
    });

    doc.save(title);
  }
}
