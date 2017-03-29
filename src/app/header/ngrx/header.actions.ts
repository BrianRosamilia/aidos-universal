import { Action } from '@ngrx/store';

import { type } from '../../store/util';

export enum HeaderActionType {
  COLLAPSE = 0,
  EXPAND = 1,
  TOGGLE = 2
}

export const HeaderActionTypes = [
  type('aidos/header/COLLAPSE'),
  type('aidos/header/EXPAND'),
  type('aidos/header/TOGGLE')
];

export class HeaderAction implements Action {
  type: string;
  constructor(type: HeaderActionType) {
    this.type = HeaderActionTypes[type];
  }
}
