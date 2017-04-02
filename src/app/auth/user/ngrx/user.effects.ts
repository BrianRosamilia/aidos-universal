import 'rxjs/add/operator/switchMap';

import { Inject, Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { UserAction, UserActionTypes, UserActionType } from './user.actions';
import { AuthAction, AuthActionTypes, AuthActionType } from '../../ngrx/auth.actions';

import { AuthService } from '../../auth.service';

@Injectable()
export class UserEffects {

  @Effect() login = this.actions
    .ofType(AuthActionTypes[AuthActionType.LOGIN])
    .map((action: AuthAction) => action.payload)
    .switchMap((payload) => this.authService.user(payload)
      .map((response: any) => new UserAction(UserActionType.SET, response)));

  @Effect() logout = this.actions.ofType(AuthActionTypes[AuthActionType.LOGOUT]).map(() => new UserAction(UserActionType.UNSET));

  constructor(private actions: Actions, private authService: AuthService) {

  }

}
