import { Component, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HoverElevationDirective } from '../../directives/hover-elevation.directive';
import {
  catchError,
  finalize,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'wify-file-upload',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HoverElevationDirective,
  ],
  styleUrl: './file-upload.scss',
  templateUrl: './file-upload.html',
})
export class FileUpload {
  readonly #snackbar = inject(MatSnackBar);

  readonly label = input.required<FileUploadType>();

  protected readonly accept = '.json';

  protected readonly isDisabled = signal<boolean>(false);
  protected readonly fileName = signal<string | null>(null);

  readonly onLoad = output<any>();

  protected onFileSelected(event: Event): void {
    this.isDisabled.set(true);

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.fileName.set(null);
      this.isDisabled.set(false);
      return;
    }

    this.isDisabled.set(true);

    of(new FileReader())
      .pipe(
        switchMap(
          (reader) =>
            new Observable<{ result: string }>((obs) => {
              reader.onload = () => {
                obs.next({ result: reader.result as string });
                obs.complete();
              };

              reader.onerror = (err) => obs.error(err);

              reader.readAsText(file);
            })
        ),
        tap(({ result }) => {
          const selectedFile = JSON.parse(result);

          if (
            (this.label() === 'Following' &&
              !selectedFile.relationships_following?.length) ||
            (this.label() === 'Followers' &&
              !selectedFile?.[0]?.string_list_data?.length)
          ) {
            throw new Error('The selected file is not a valid format');
          }

          this.fileName.set(file?.name ?? null);
          this.onLoad.emit(selectedFile);
        }),
        catchError((e) => {
          this.#snackbar.open(e);
          return throwError(() => e);
        }),
        finalize(() => {
          this.isDisabled.set(false);
        }),
        take(1)
      )
      .subscribe();
  }
}

type FileUploadType = 'Following' | 'Followers';
