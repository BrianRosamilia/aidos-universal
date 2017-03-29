import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AuthAction, AuthActionType } from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions: Actions) {

  }

}
