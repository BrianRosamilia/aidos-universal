import { Action } from '@ngrx/store';

import { AuthState } from './auth.reducer';
import { type } from '../../ngrx/util';

export enum AuthActionType {
  LOGIN = 0,
  LOGOUT = 1
}

export const AuthActionTypes = [
  type('aidos/auth/LOGIN'),
  type('aidos/auth/LOGOUT')
];

export class AuthAction implements Action {
  type: string;
  payload: AuthState;
  constructor(type: AuthActionType, payload?: AuthState) {
    this.type = AuthActionTypes[type];
    if (type === AuthActionType.LOGIN) {
      this.payload = payload;
    }
  }
}
