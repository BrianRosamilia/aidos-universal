import { UserAction, UserActionType, UserActionTypes } from './user.actions';

import { Record } from 'immutable';

export interface UserState {
  username: string;
  role: string;
}

const initialUser = {
  username: undefined,
  role: undefined
};

class UserStateRecord extends Record(initialUser) implements UserState {
  username: string;
  role: string;
  constructor(data) {
    super(data);
  }
}

export function userReducer(state: UserState = new UserStateRecord(initialUser), action: UserAction): UserState {
  switch (action.type) {
    case UserActionTypes[UserActionType.SET]:
      state = Object.assign({}, state, action.payload);
      break;
    case UserActionTypes[UserActionType.UNSET]:
      state = Object.assign({}, state, initialUser);
      break;
    default:
  }
  return state;
};
