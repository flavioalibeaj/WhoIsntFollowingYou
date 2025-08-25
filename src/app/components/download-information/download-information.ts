import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserData } from '../../model/user-data.type';
import { Print } from '../../services/print';

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
      <button mat-menu-item>
        <mat-icon>picture_as_pdf</mat-icon>
        Pdf
      </button>
      <button mat-menu-item>
        <mat-icon>download</mat-icon>
        Csv
      </button>
      <button mat-menu-item>
        <mat-icon>backup_table</mat-icon>
        Excel
      </button>
    </mat-menu>
  `,
})
export class DownloadInformation {
  readonly #print = inject(Print);

  readonly usersList = input.required<UserData[]>();
  readonly title = input.required<string>();

  protected print() {
    this.#print.print(this.usersList(), this.title().toUpperCase());
  }
}
