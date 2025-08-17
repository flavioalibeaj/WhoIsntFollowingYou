import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FirstCharacter } from '../../pipes/first-character.pipe';
import { UnixToDate } from '../../pipes/unix-to-date.pipe';
import { DatePipe } from '@angular/common';
import { AvatarBackgroundDirective } from '../../directives/avatar-background.directive';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Button } from '../button/button';
import { Platform } from '@angular/cdk/platform';
import { UserData } from '../../model/user-data.type';

@Component({
  imports: [
    MatCardModule,
    FirstCharacter,
    UnixToDate,
    DatePipe,
    AvatarBackgroundDirective,
    Button,
  ],
  styleUrl: './result-card.scss',
  selector: 'wify-result-card',
  templateUrl: './result-card.html',
})
export class ResultCard {
  private readonly clipboard = inject(Clipboard);
  private readonly snackBar = inject(MatSnackBar);
  private readonly platform = inject(Platform);

  readonly person = input.required<UserData>();

  protected copyToClipboard() {
    this.clipboard.copy(this.person().href);
    this.snackBar.open('Copied to clipboard', 'Close', {
      duration: 1500,
    });
  }

  protected goToAccount() {
    const personUrl = this.person().href;
    const username = this.person().value;

    const isAndroid = this.platform.ANDROID;
    const isIOS = this.platform.IOS;

    if (isAndroid || isIOS) {
      const appLink = `instagram://user?username=${username}`;

      window.location.href = appLink;

      setTimeout(() => {
        window.open(personUrl, '_blank');
      }, 1500);
    } else {
      window.open(personUrl, '_blank');
    }
  }
}
