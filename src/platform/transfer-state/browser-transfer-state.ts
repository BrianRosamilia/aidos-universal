import { Inject, Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';

import { TransferState } from './transfer-state';

import { AppAction, AppActionType } from '../../app/ngrx/app.actions';
import { AppState } from '../../app/ngrx/app.reducer';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Injectable()
export class BrowserTransferState extends TransferState {

  constructor(private store: Store<AppState>, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    super();
  }

  initialize() {
    // tslint:disable-next-line:no-string-literal
    const cache: any = window['TRANSFER_STATE'] || {};
    Object.keys(cache).forEach((key: string) => {
      if (key !== 'actions') {
        this.set(key, cache[key]);
      }
    });
    if (this.config.prerenderStrategy === 'replay') {
      if (cache.actions !== undefined) {
        console.info('Replay:', cache.actions);
        this.store.dispatch(new AppAction(AppActionType.REPLAY, cache.actions));
      } else {
        console.info('No actions occured during prerender.');
      }
    } else if (this.config.prerenderStrategy === 'rehydrate') {
      console.info('Rehydrate:', cache.state);
      this.store.dispatch(new AppAction(AppActionType.REHYDRATE, cache.state));
    } else {
      console.warn([this.config.prerenderStrategy, 'is not a valid prerender strategy!'].join(' '));
    }
  }

}
