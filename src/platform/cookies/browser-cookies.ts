import { Injectable } from '@angular/core';

import { Cookies } from './cookies';

@Injectable()
export class BrowserCookies implements Cookies {

  set(name: string, value: string, days: number, path?: string): void {
    let date: Date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires: string = 'expires=' + date.toUTCString();
    window.document.cookie = [name, '=', value, '; ', expires, path ? '; path=' + path : ''].join('');
  }

  get(name: string): string {
    let cookies: string[] = window.document.cookie.split(';');
    let cookie: string;
    for (const cc of cookies) {
      let c: string = cc.replace(/^\s\+/g, '');
      if (c.indexOf(name + '=') === 0) {
        cookie = c.substring(name.length + 1, c.length);
        break;
      }
    }
    return cookie;
  }

  remove(name: string): void {
    this.set(name, '', -1);
  }

}
