import 'rxjs/add/operator/switchMap';

import { Inject, Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { UserAction, UserActionTypes, UserActionType } from './user.actions';
import { AuthAction, AuthActionTypes, AuthActionType } from '../../ngrx/auth.actions';

import { TransferHttp } from '../../../../platform/transfer-http/transfer-http';
import { GLOBAL_CONFIG, GlobalConfig } from '../../../../config';

@Injectable()
export class UserEffects {

  @Effect() login = this.actions
    .ofType(AuthActionTypes[AuthActionType.LOGIN])
    .map((action: AuthAction) => action.payload)
    .switchMap((payload) => this.http.get(this.config.zuul.baseUrl + '/uaa/user-details', { withCredentials: true })
      .map((response: any) => new UserAction(UserActionType.SET, response)));

  @Effect() logout = this.actions.ofType(AuthActionTypes[AuthActionType.LOGOUT]).map(() => new UserAction(UserActionType.UNSET));

  constructor(private actions: Actions, private http: TransferHttp, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {

  }

}
