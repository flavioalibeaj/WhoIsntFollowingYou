import { Component, computed, input, model, signal } from '@angular/core';
import { ResultCard } from '../result-card/result-card';
import { StateData } from '../../model/state-data.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { DownloadInformation } from '../download-information/download-information';
import { Paginator } from '../paginator/paginator';
import { UserData } from '../../model/user-data.type';

@Component({
  selector: 'wify-result-tab-content',
  imports: [
    ResultCard,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    Button,
    DownloadInformation,
    Paginator,
  ],
  styles: `
    :host ::ng-deep .mat-mdc-paginator-container {
      justify-content: space-between;
    }
  `,
  templateUrl: './result-tab-content.html',
})
export class ResultTabContent {
  readonly item = input.required<StateData>();

  protected readonly searchFilter = model<string>();

  protected readonly pagedItems = signal<UserData[]>([]);

  protected readonly items = computed(() => {
    const searchTerm = this.searchFilter();

    let originalData = this.item().data;

    if (searchTerm) {
      originalData = originalData.filter(
        (d) => d.href.includes(searchTerm) || d.value.includes(searchTerm)
      );
    }

    return originalData;
  });
}
