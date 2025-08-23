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
      <mat-tab class="p-10" [label]="item.tabLabel">
        <wify-result-tab-content [item]="item" />
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
