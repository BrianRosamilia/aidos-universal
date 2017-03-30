import { RouterState } from '@ngrx/router-store';
import { WindowState } from '../core/window/ngrx/window.reducer';
import { AuthState } from '../auth/ngrx/auth.reducer';
import { UserState } from '../auth/user/ngrx/user.reducer';
import { HeaderState } from '../header/ngrx/header.reducer';

export interface AppState {
  router: RouterState;
  window: WindowState;
  header: HeaderState;
  auth: AuthState;
  user: UserState;
}
