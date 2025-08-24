import { Injectable } from '@angular/core';
import { User } from '../model/user.type';
import { StateData } from '../model/state-data.type';

@Injectable({
  providedIn: 'root',
})
export class Wify {
  getResults(followers: User[], followings: User[]): StateData[] {
    return [
      {
        data: this.#getUnreciprocated(followers, followings, 'notFollowingYou'),
        dataType: 'unfollowers',
        tabLabel: 'Not Following You',
        tabParagraph: "people don't follow you back",
      },
      {
        dataType: 'followers',
        tabLabel: 'You do not follow',
        tabParagraph: 'people not followed back',
        data: this.#getUnreciprocated(followers, followings, 'youDontFollow'),
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

  #getUnreciprocated(
    followers: User[],
    following: User[],
    type: 'notFollowingYou' | 'youDontFollow'
  ) {
    const source = type === 'notFollowingYou' ? following : followers;
    const target = type === 'notFollowingYou' ? followers : following;

    const diff = source.map((user) => {
      const match = target.find(
        (u) => u.string_list_data[0].value === user.string_list_data[0].value
      );

      return {
        ...user,
        isReciprocated: !!match,
      };
    });

    return diff
      .filter((d) => !d.isReciprocated)
      .sort(
        (a, b) =>
          a.string_list_data[0].timestamp - b.string_list_data[0].timestamp
      )
      .map((d) => {
        const { href, timestamp, value } = d.string_list_data[0];

        return {
          timestamp,
          value,
          href,
        };
      });
  }
}
