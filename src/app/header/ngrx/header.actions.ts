import { Action } from '@ngrx/store';

import { type } from '../../ngrx/util';

export enum HeaderActionType {
  COLLAPSE = 0,
  EXPAND = 1,
  TOGGLE = 2,
  HIDE_LOGIN = 3,
  SHOW_LOGIN = 4
}

export const HeaderActionTypes = [
  type('aidos/header/COLLAPSE'),
  type('aidos/header/EXPAND'),
  type('aidos/header/TOGGLE'),
  type('aidos/header/HIDE_LOGIN'),
  type('aidos/header/SHOW_LOGIN')
];

export class HeaderAction implements Action {
  type: string;
  constructor(type: HeaderActionType) {
    this.type = HeaderActionTypes[type];
  }
}
