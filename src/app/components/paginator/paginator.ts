import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserData } from '../../model/user-data.type';

@Component({
  imports: [MatPaginatorModule],
  selector: 'wify-paginator',
  templateUrl: './paginator.html',
})
export class Paginator {
  readonly items = input.required<UserData[]>();
  readonly onPagedItems = output<UserData[]>();

  readonly #pageEvent = signal<PageEvent | undefined>(undefined);
  readonly #pagedItemsEff = effect(() =>
    this.onPagedItems.emit(this.pagedItems())
  );

  protected readonly pagedItems = computed<UserData[]>(() => {
    const items = this.items();
    const pageSize = this.pageSize();
    const pageIndex = this.pageIndex();

    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const slicedItems = items.slice(start, end);

    return slicedItems;
  });

  protected readonly pageSizeOptions = computed<number[]>(() => {
    const items = this.items();

    const pageOptions: number[] = [];

    [10, 25, 50, 100].forEach((n) => {
      if (n <= items.length) {
        pageOptions.push(n);
      }
    });

    pageOptions.push(items.length);

    return pageOptions;
  });

  protected readonly pageSize = computed<number>(() => {
    const options = this.pageSizeOptions();
    const event = this.#pageEvent();

    const selectedOption = event ? event.pageSize : options[0] ?? 0;

    return selectedOption;
  });

  protected readonly pageIndex = computed<number>(
    () => this.#pageEvent()?.pageIndex ?? 0
  );

  protected handlePageEvent(e: PageEvent): void {
    this.#pageEvent.set(e);
  }
}
