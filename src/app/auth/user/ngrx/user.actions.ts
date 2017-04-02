import { Action } from '@ngrx/store';

import { UserState } from './user.reducer';
import { type } from '../../../store/util';

export enum UserActionType {
  SET = 0,
  UNSET = 1
}

export const UserActionTypes = [
  type('aidos/user/SET'),
  type('aidos/user/UNSET')
];

export class UserAction implements Action {
  type: string;
  payload: UserState;
  constructor(type: UserActionType, payload?: UserState) {
    this.type = UserActionTypes[type];
    if (type === UserActionType.SET) {
      console.log(payload);
      this.payload = payload;
    }
  }
}
