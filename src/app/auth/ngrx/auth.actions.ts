import { Action } from '@ngrx/store';

import { type } from '../../store/util';

export enum AuthActionType {

}

export const AuthActionTypes = [

];

export class AuthAction implements Action {
  type: string;
  constructor(type: AuthActionType) {
    this.type = AuthActionTypes[type];
  }
}
