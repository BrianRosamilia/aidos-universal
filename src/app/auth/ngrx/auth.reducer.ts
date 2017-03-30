import { AuthAction, AuthActionType, AuthActionTypes } from './auth.actions';

import { Record } from 'immutable';

export interface AuthState {
  sessionId: string;
  authenticated: boolean;
}

const AuthRecord = Record({
  sessionId: undefined,
  authenticated: false
});

class AuthStateRecord extends AuthRecord implements AuthState {
  sessionId: string;
  authenticated: boolean;
  constructor(data) {
    super(data);
  }
}

const initialState: AuthStateRecord = new AuthStateRecord({
  navbarCollapsed: true
});

export function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {

    default:
  }
  return state;
};
