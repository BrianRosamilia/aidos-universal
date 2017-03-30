import { AuthAction, AuthActionType, AuthActionTypes } from './auth.actions';

import { Record } from 'immutable';

export interface AuthState {
  username: string;
  sessionId: string;
  authenticated: boolean;
}

const initialAuth = {
  username: undefined,
  sessionId: undefined,
  authenticated: false
};

class AuthStateRecord extends Record(initialAuth) implements AuthState {
  username: string;
  sessionId: string;
  authenticated: boolean;
  constructor(data) {
    super(data);
  }
}

export function authReducer(state: AuthState = new AuthStateRecord(initialAuth), action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes[AuthActionType.LOGIN]:
    case AuthActionTypes[AuthActionType.LOGOUT]:
      state = Object.assign({}, state, action.payload);
      break;
    default:
  }
  return state;
};
