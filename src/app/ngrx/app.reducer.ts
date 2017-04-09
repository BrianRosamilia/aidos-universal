import { AppAction, AppActionType, AppActionTypes } from './app.actions';

import { combineReducers } from '@ngrx/store';
import { RouterState } from '@ngrx/router-store';
import { WindowState } from '../core/window/ngrx/window.reducer';
import { AuthState } from '../auth/ngrx/auth.reducer';
import { UserState } from '../auth/user/ngrx/user.reducer';
import { HeaderState } from '../header/ngrx/header.reducer';

import { routerReducer } from '@ngrx/router-store';
import { windowReducer } from '../core/window/ngrx/window.reducer';
import { authReducer } from '../auth/ngrx/auth.reducer';
import { userReducer } from '../auth/user/ngrx/user.reducer';
import { headerReducer } from '../header/ngrx/header.reducer';

export interface AppState {
  router: RouterState;
  window: WindowState;
  header: HeaderState;
  auth: AuthState;
  user: UserState;
}

const initialAppState = {
  router: undefined,
  window: undefined,
  header: undefined,
  auth: undefined,
  user: undefined
};

export function appReducer(state: AppState = initialAppState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionTypes[AppActionType.REHYDRATE]:
      state = Object.assign({}, state, action.payload);
      break;
    case AppActionTypes[AppActionType.REPLAY]:
      break;
    default:
  }
  return combineReducers({
    router: routerReducer,
    window: windowReducer,
    header: headerReducer,
    auth: authReducer,
    user: userReducer
  })(state, action);
};
