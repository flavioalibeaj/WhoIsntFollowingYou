import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ResultCard } from '../../components/result-card/result-card';
import { MatTabsModule } from '@angular/material/tabs';
import { StateData } from '../../model/state-data.type';

@Component({
  imports: [ResultCard, MatTabsModule],
  template: `
    <mat-tab-group>
      @for (item of result; track $index) {
      <mat-tab [label]="item.label">
        @if (item.data.length) {
        <div
          class="grid gap-5 m-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          @for (person of item.data; track $index) { @defer (on viewport) {
          <wify-result-card [person]="person" />
          } @placeholder {
          <p>Large component placeholder</p>
          } }
        </div>
        } @else { there is no data }
      </mat-tab>
      }
    </mat-tab-group>
  `,
})
export class Result {
  private readonly router = inject(Router);

  private readonly state = this.router.getCurrentNavigation()?.extras.state;
  protected readonly result?: StateData[] = this.state?.['result'];
}
