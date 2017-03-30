import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app-state.store';

import { AuthAction, AuthActionType } from './ngrx/auth.actions';

import { TransferState } from '../../platform/transfer-state/transfer-state';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Injectable()
export class AuthService {

  constructor(private cache: TransferState, private store: Store<AppState>, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    const cookie: string = cache.get('cookie');
    if (cookie) {
      const cookies: string[] = cache.get('cookie').split(';');
      for (let i in cookies) {
        if (cookies[i].trim().indexOf('JSESSIONID') === 0) {
          store.dispatch(new AuthAction(AuthActionType.LOGIN, {
            sessionId: cookies[i].trim().split('=')[1],
            authenticated: true
          }));
        }
      }
    }
  }

}
