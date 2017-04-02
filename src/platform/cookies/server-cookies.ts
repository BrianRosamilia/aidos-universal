import { Injectable } from '@angular/core';

import { Cookies } from './cookies';

@Injectable()
export class ServerCookies implements Cookies {

  set(name: string, value: string, days: number, path?: string): void {
    console.warn('Cannot set cookies on the server!');
  }

  get(name: string): string {
    console.warn('No cookies on the server to get!');
    return undefined;
  }

  remove(name: string): void {
    console.warn('No cookies on the server to remove!');
  }

}
