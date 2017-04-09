import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AppAction, AppActionType } from './app.actions';

@Injectable()
export class AppEffects {

  constructor(private actions: Actions) {

  }

}
