import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { routerActions } from '@ngrx/router-store';
import { HeaderAction, HeaderActionType } from './header.actions';

@Injectable()
export class HeaderEffects {

  @Effect() routeChange = this.actions.ofType(routerActions.UPDATE_LOCATION).map(() => new HeaderAction(HeaderActionType.COLLAPSE));

  constructor(private actions: Actions) {

  }

}
