import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { AppAction, AppActionType, AppActionTypes } from './app.actions';
import { AppState } from './app.reducer';

@Injectable()
export class AppEffects {

  @Effect() replay = this.actions.ofType(AppActionTypes[AppActionType.REPLAY]).map((action: Action) => {
    action.payload.forEach((action: Action) => {
      this.store.dispatch(action);
    });
    return Observable.of({});
  });

  constructor(private actions: Actions, private store: Store<AppState>) {

  }

}
