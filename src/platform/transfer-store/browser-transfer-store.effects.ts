import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { TransferStoreEffects } from './transfer-store.effects';

@Injectable()
export class BrowserTransferStoreEffects extends TransferStoreEffects {

  constructor(private actions: Actions) {
    super();
  }

}
