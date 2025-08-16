import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HoverElevationDirective } from '../../directives/hover-elevation.directive';

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
  readonly label = input.required<string>();

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

    const reader = new FileReader();

    reader.onload = () => {
      let selectedFile = JSON.parse(reader.result as string);

      try {
        if (
          this.label() === 'Following' &&
          !selectedFile.relationships_following
        )
          return;

        if (
          (this.label() === 'Followers' && !selectedFile.length) ||
          !selectedFile[0].string_list_data.length
        )
          return;

        this.fileName.set(file?.name ?? null);
        this.onLoad.emit(selectedFile);
      } catch (e) {
        // TODO add better error handling
        selectedFile = null;
      } finally {
        this.isDisabled.set(false);
      }
    };

    reader.onerror = () => {};

    reader.readAsText(file);
  }
}
