import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { types } from '../../app/ngrx/util';

import { TransferStoreEffects } from './transfer-store.effects';

@Injectable()
export class BrowserTransferStoreEffects extends TransferStoreEffects {

  @Effect({ dispatch: false }) track = this.actions.ofType(...types()).switchMap((action: Action) => {
    this.logAction(action);
    return Observable.of({});
  });

  constructor(private actions: Actions) {
    super();
  }

  private logAction(action: Action): void {
    console.info(action);
  }

}
