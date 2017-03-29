import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HeaderAction, HeaderActionType } from '../../../header/ngrx/header.actions';
import { WindowActionTypes, WindowActionType } from './window.actions';

@Injectable()
export class WindowEffects {

  @Effect() windowResize = this.actions.ofType(WindowActionTypes[WindowActionType.RESIZE]).map(() => new HeaderAction(HeaderActionType.COLLAPSE));

  constructor(private actions: Actions) {

  }

}
