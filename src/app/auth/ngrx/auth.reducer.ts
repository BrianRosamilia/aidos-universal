import { AuthAction, AuthActionType, AuthActionTypes } from './auth.actions';

import { Record } from 'immutable';

export interface AuthState {
  cookie: string;
  authenticated: boolean;
}

const initialAuth = {
  cookie: undefined,
  authenticated: false
};

class AuthStateRecord extends Record(initialAuth) implements AuthState {
  cookie: string;
  authenticated: boolean;
  constructor(data) {
    super(data);
  }
}

export function authReducer(state: AuthState = new AuthStateRecord(initialAuth), action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes[AuthActionType.LOGIN]:
      state = Object.assign({}, state, action.payload);
      break;
    case AuthActionTypes[AuthActionType.LOGOUT]:
      state = Object.assign({}, state, initialAuth);
      break;
    default:
  }
  return state;
};
