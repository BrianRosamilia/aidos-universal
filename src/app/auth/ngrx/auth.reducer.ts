import { AuthAction, AuthActionType, AuthActionTypes } from './auth.actions';

import { Record } from 'immutable';

export interface AuthState {
  authenticated: boolean;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

const initialAuth = {
  authenticated: false,
  access_token: undefined,
  expires_in: undefined,
  refresh_token: undefined,
  scope: undefined,
  token_type: undefined,
};

class AuthStateRecord extends Record(initialAuth) implements AuthState {
  // tslint:disable:variable-name
  authenticated: boolean;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  // tslint:enable:variable-name
  constructor(data) {
    super(data);
  }
}

export function authReducer(state: AuthState = new AuthStateRecord(initialAuth), action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes[AuthActionType.LOGIN]:
      action.payload.authenticated = true;
      state = Object.assign({}, state, action.payload);
      break;
    case AuthActionTypes[AuthActionType.LOGOUT]:
      state = Object.assign({}, state, initialAuth);
      break;
    default:
  }
  return state;
};
