import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { StateData } from '../../model/state-data.type';
import { ResultTabContent } from '../../components/result-tab-content/result-tab-content';

@Component({
  imports: [MatTabsModule, ResultTabContent],
  template: `
    <mat-tab-group>
      @for (item of result; track $index) {
      <mat-tab [label]="item.tabLabel">
        <div class="p-10">
          <p class="font-medium text-2xl">
            {{ item.data.length }} {{ item.tabParagraph }}
          </p>

          @defer(on viewport) {
          <wify-result-tab-content [item]="item" />
          } @placeholder {
          <p>Loading ...</p>
          }
        </div>
      </mat-tab>
      }
    </mat-tab-group>
  `,
})
export class Result {
  private readonly router = inject(Router);

  private readonly state = this.router.currentNavigation()?.extras.state;
  protected readonly result?: StateData[] = this.state?.['result'];
}
