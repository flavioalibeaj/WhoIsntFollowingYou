import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserData } from '../../model/user-data.type';
import { Print } from '../../services/print';
import { Pdf } from '../../services/pdf';
import { Csv } from '../../services/csv';
import { Excel } from '../../services/excel';

@Component({
  selector: 'wify-download-information',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  template: `
    <button matButton="filled" [matMenuTriggerFor]="menu">Export Data</button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="print()">
        <mat-icon>print</mat-icon>
        Print
      </button>
      <button mat-menu-item (click)="generatePdf()">
        <mat-icon>picture_as_pdf</mat-icon>
        Pdf
      </button>
      <button mat-menu-item (click)="generateCsv()">
        <mat-icon>download</mat-icon>
        Csv
      </button>
      <button mat-menu-item (click)="generateExcel()">
        <mat-icon>backup_table</mat-icon>
        Excel
      </button>
    </mat-menu>
  `,
})
export class DownloadInformation {
  readonly #print = inject(Print);
  readonly #pdf = inject(Pdf);
  readonly #csv = inject(Csv);
  readonly #excel = inject(Excel);

  readonly usersList = input.required<UserData[]>();
  readonly title = input.required<string>();

  protected print() {
    this.#print.print(this.usersList(), this.title().toUpperCase());
  }

  protected generatePdf() {
    this.#pdf.generatePdf(this.usersList(), this.title().toUpperCase());
  }

  protected generateCsv() {
    this.#csv.downloadCSV(this.usersList(), this.title().toUpperCase());
  }

  protected generateExcel() {
    this.#excel.generateExcel(this.usersList(), this.title().toUpperCase());
  }
}
