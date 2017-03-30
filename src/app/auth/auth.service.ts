import { Inject, Injectable } from '@angular/core';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

import { TransferState } from '../../platform/transfer-state/transfer-state';

@Injectable()
export class AuthService {

  constructor(private cache: TransferState, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    const cookie: string = cache.get('cookie');
    let jsessionId: string;
    if (cookie) {
      const cookies: string[] = cache.get('cookie').split(';');
      for (let i in cookies) {
        if (cookies[i].trim().indexOf('JSESSIONID') === 0) {
          jsessionId = cookies[i].trim().split('=')[1];
          console.log(jsessionId);
        }
      }
    }
  }

}
