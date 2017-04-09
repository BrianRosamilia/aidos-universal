import { Action } from '@ngrx/store';

import { AppState } from './app.reducer';
import { type } from './util';

export enum AppActionType {
  REHYDRATE = 0,
  REPLAY = 1
}

export const AppActionTypes = [
  type('aidos/app/REHYDRATE'),
  type('aidos/app/REPLAY')
];

export class AppAction implements Action {
  type: string;
  payload: AppState | Action[];
  constructor(type: AppActionType, payload: AppState | Action[]) {
    this.type = AppActionTypes[type];
    this.payload = payload;
  }
}
