import { Component, inject, signal } from '@angular/core';
import { Button } from '../../components/button/button';
import { FileUpload } from '../../components/file-upload/file-upload';
import { Wify } from '../../services/wify';
import { Router } from '@angular/router';
import { Following } from '../../model/following.type';
import { User } from '../../model/follower.type';

@Component({
  imports: [Button, FileUpload],
  template: `
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-xl mt-4 font-medium">Upload files</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <wify-file-upload label="Following" (onLoad)="setFollowing($event)" />
        <wify-file-upload label="Followers" (onLoad)="setFollowers($event)" />
      </div>
      <wify-button
        text="Check Results"
        icon="search"
        [isDisabled]="!followers().length || !following().length"
        (clicked)="goToResults()"
      />
    </div>
  `,
})
export class Home {
  private readonly wify = inject(Wify);
  private readonly router = inject(Router);

  protected readonly followers = signal<User[]>([]);
  protected readonly following = signal<User[]>([]);

  protected setFollowers(followers: User[]): void {
    this.followers.set(followers);
  }
  protected setFollowing({ relationships_following }: Following): void {
    this.following.set(relationships_following);
  }

  protected goToResults(): void {
    const result = this.wify.whoIsntFollowingYou(
      this.followers(),
      this.following()
    );
    this.router.navigate(['/result'], {
      state: {
        result,
      },
    });
  }
}

// TODO what happens when i put a defer block inside a defer block
