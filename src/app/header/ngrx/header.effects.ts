import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { routerActions } from '@ngrx/router-store';
import { HeaderAction, HeaderActionType } from './header.actions';
import { UserActionTypes, UserActionType } from '../../auth/user/ngrx/user.actions';

@Injectable()
export class HeaderEffects {

  @Effect() routeChange = this.actions.ofType(routerActions.UPDATE_LOCATION).map(() => new HeaderAction(HeaderActionType.COLLAPSE));

  @Effect() login = this.actions.ofType(UserActionTypes[UserActionType.SET]).map(() => new HeaderAction(HeaderActionType.HIDE_LOGIN));

  @Effect() logout = this.actions.ofType(UserActionTypes[UserActionType.UNSET]).map(() => new HeaderAction(HeaderActionType.SHOW_LOGIN));

  constructor(private actions: Actions) {

  }

}
