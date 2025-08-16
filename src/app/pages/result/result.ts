import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../model/follower.type';
import { ResultCard } from '../../components/result-card/result-card';

@Component({
  imports: [ResultCard],
  template: `
    @if (peopleThatDontFollowYouBack?.length) {
    <div
      class="grid gap-5 m-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      @for (person of peopleThatDontFollowYouBack; track $index) { @defer (on
      viewport) {
      <wify-result-card [person]="person" />
      } @placeholder {
      <p>Large component placeholder</p>
      } }
    </div>
    } @else { there is no data }
  `,
})
export class Result {
  private readonly router = inject(Router);

  private readonly state = this.router.getCurrentNavigation()?.extras.state;
  protected readonly peopleThatDontFollowYouBack?: Data[] =
    this.state?.['result'];
}
