import { routerReducer } from '@ngrx/router-store';
import { windowReducer } from '../core/window/ngrx/window.reducer';
import { authReducer } from '../auth/ngrx/auth.reducer';
import { userReducer } from '../auth/user/ngrx/user.reducer';
import { headerReducer } from '../header/ngrx/header.reducer';

export const rootReducer = {
  router: routerReducer,
  window: windowReducer,
  header: headerReducer,
  auth: authReducer,
  user: userReducer
};
