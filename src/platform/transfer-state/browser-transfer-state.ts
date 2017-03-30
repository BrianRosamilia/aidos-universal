import { Inject, Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store';

import { TransferState } from './transfer-state';

import { AppState } from '../../app/store/app-state.store';

@Injectable()
export class BrowserTransferState extends TransferState {

  constructor(private store: Store<AppState>) {
    super();
  }

  initialize() {
    console.log('Browser transfer initialize.');
    const state: any = window['TRANSFER_STATE'] || {};
    Object.keys(state).forEach((key: string) => {
      if (key === 'actions') {
        for (const action of state[key]) {
          console.log('Dispatch action:', action);
          this.store.dispatch(action);
        }
      } else {
        this.set(key, state[key]);
      }
    });
  }

  inject() {
    console.log('Browser transfer inject.');
  }

}
