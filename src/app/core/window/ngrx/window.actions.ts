import { Action } from '@ngrx/store';

import { WindowState } from './window.reducer';
import { type } from '../../../store/util';

export enum WindowActionType {
  RESIZE = 0
};

export const WindowActionTypes = [
  type('aidos/window/RESIZE')
];

export class WindowAction implements Action {
  type: string;
  payload: WindowState;
  constructor(type: WindowActionType, payload: WindowState) {
    this.type = WindowActionTypes[type];
    this.payload = payload;
  }
}
