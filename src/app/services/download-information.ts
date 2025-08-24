import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { UserData } from '../model/user-data.type';
import { Wify } from './wify';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DownloadInformationService {
  readonly #wify = inject(Wify);
  readonly #locale = inject(LOCALE_ID);

  print(list: UserData[], title: string) {
    const popUpWin = window.open('', 'top=0,left=0,height=100%');

    if (!popUpWin) return;

    popUpWin.document.open();

    const html = popUpWin.document.createElement('html');
    const head = popUpWin.document.createElement('head');
    const body = popUpWin.document.createElement('body');

    head.innerHTML = this.#getHeadElements(title);

    body.innerHTML = this.#getBodyElements(list);

    html.appendChild(head);
    html.appendChild(body);
    popUpWin.document.appendChild(html);

    popUpWin.document.close();

    popUpWin.print();
  }

  #getTableRows(list: UserData[]): string {
    return list
      .map(({ href, timestamp, value }) => {
        const dateFromUnix = this.#wify.getDateFromUnix(timestamp);
        const date = formatDate(dateFromUnix, 'mm-dd-yyyy', this.#locale);

        const row = `
          <tr>
            <td>${value ?? '--'}</td>
            <td>${date ?? '--'}</td>
            <td>${href ?? '--'}</td>
          </tr>
        `;
        return row;
      })
      .join('');
  }

  #getHeadElements(title: string) {
    return `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
          body {
            font-family: arial;
          }
          table {
              width: 100%;
              border-collapse: collapse;
              border-radius: 5px;
          }
          th, td {
              border: 0.5px solid #b3b3b3;
              padding: 8px;
              text-align: center;
          }
          th {
              background-color: #f2f2f2;
          }
      </style>
  `;
  }

  #getBodyElements(list: UserData[]) {
    const tableRows = this.#getTableRows(list);

    return `<table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Started Following at</th>
                <th>Link</th>
            </tr>
        </thead>
        <tbody>
            ${tableRows}
        </tbody>
    </table>`;
  }
}
