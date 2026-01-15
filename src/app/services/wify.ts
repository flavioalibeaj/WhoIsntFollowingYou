import { Injectable } from '@angular/core';
import { User } from '../model/user.type';
import { DataType, StateData } from '../model/state-data.type';

@Injectable({
  providedIn: 'root',
})
export class Wify {
  getResults(followers: User[], followings: User[]): StateData[] {
    return [
      {
        data: this.#getUnreciprocated(
          followers,
          followings,
          DataType.UNFOLLOWERS
        ),
        dataType: DataType.UNFOLLOWERS,
        tabLabel: 'Not Following You',
        tabParagraph: "people don't follow you back",
      },
      {
        dataType: DataType.FOLLOWERS,
        tabLabel: 'You do not follow',
        tabParagraph: 'people not followed back',
        data: this.#getUnreciprocated(
          followers,
          followings,
          DataType.FOLLOWERS
        ),
      },
    ];
  }

  getFirstLetter(username: string): string {
    const match = username.match(/\p{L}/u);
    const firstLetter = match ? match[0] : '';

    return firstLetter;
  }

  getColorForLetter(letter: string): string {
    const colorMap: { [key: string]: string } = {
      A: '#f44336',
      B: '#e91e63',
      C: '#9c27b0',
      D: '#673ab7',
      E: '#3f51b5',
      F: '#2196f3',
      G: '#03a9f4',
      H: '#00bcd4',
      I: '#009688',
      J: '#4caf50',
      K: '#8bc34a',
      L: '#cddc39',
      M: '#ffeb3b',
      N: '#ffc107',
      O: '#ff9800',
      P: '#ff5722',
      Q: '#795548',
      R: '#9e9e9e',
      S: '#607d8b',
      T: '#a1887f',
      U: '#90a4ae',
      V: '#f06292',
      W: '#ba68c8',
      X: '#9575cd',
      Y: '#4dd0e1',
      Z: '#81c784',
    };
    return colorMap[letter] || '#ccc';
  }

  getDateFromUnix(unix: number): Date {
    const date = new Date(unix * 1000);

    return date;
  }

  #getUnreciprocated(followers: IgUser[], following: IgUser[], type: DataType) {
    const source = type === DataType.UNFOLLOWERS ? following : followers;
    const target = type === DataType.UNFOLLOWERS ? followers : following;

    const key = (u: IgUser) =>
      (u.string_list_data?.[0]?.value ?? u.title ?? '').trim().toLowerCase();

    const targetKeys = new Set(target.map(key).filter(Boolean));

    return source
      .filter((u) => {
        const k = key(u);
        return k && !targetKeys.has(k);
      })
      .sort(
        (a, b) =>
          (a.string_list_data?.[0]?.timestamp ?? 0) -
          (b.string_list_data?.[0]?.timestamp ?? 0)
      )
      .map((u) => {
        const s0 = u.string_list_data?.[0];
        const username = (s0?.value ?? u.title ?? '').trim();

        return {
          timestamp: s0.timestamp,
          value: username,
          href: s0.href,
        };
      });
  }
}

type IgUser = {
  title: string;
  string_list_data: Array<{
    href: string;
    value?: string;
    timestamp: number;
  }>;
};
