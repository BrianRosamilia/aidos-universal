import { Action } from '@ngrx/store';
import { type } from '../../../store/util';

export enum WindowActionType {
  RESIZE = 0
};

export const WindowActionTypes = [
  type('aidos/window/RESIZE')
];

export interface WindowSize {
  width: number;
  height: number;
}

export class WindowAction implements Action {
  type: string;
  payload: WindowSize;
  constructor(type: WindowActionType, payload: WindowSize) {
    this.type = WindowActionTypes[type];
    this.payload = payload;
  }
}
