import { Component, computed, input, model } from '@angular/core';
import { ResultCard } from '../result-card/result-card';
import { StateData } from '../../model/state-data.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'wify-result-tab-content',
  imports: [
    ResultCard,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  styles: `
    :host {
      display: block;
      padding: 2.5rem;
    }
  `,
  template: `
    <mat-form-field>
      <mat-label>Filter</mat-label>
      <input matInput [(ngModel)]="searchFilter" />
      <button
        matSuffix
        matIconButton
        aria-label="Clear"
        [disabled]="!searchFilter()"
        (click)="searchFilter.set('')"
      >
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>

    @if (items().length) {
    <div
      class="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      @for (person of items(); track $index) { @defer (on viewport) {
      <wify-result-card [person]="person" />
      } @placeholder {
      <p>Loading ...</p>
      } }
    </div>
    } @else {
    <div class="flex justify-center">
      <p class="font-medium text-xl">No data available</p>
    </div>
    }
  `,
})
export class ResultTabContent {
  readonly item = input.required<StateData>();

  protected readonly searchFilter = model<string>();

  protected readonly items = computed(() => {
    const searchTerm = this.searchFilter();

    if (searchTerm) {
      return this.item().data.filter(
        (d) => d.href.includes(searchTerm) || d.value.includes(searchTerm)
      );
    }

    return this.item().data;
  });
}
