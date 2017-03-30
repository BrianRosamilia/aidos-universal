import { HeaderAction, HeaderActionType, HeaderActionTypes } from './header.actions';

import { Record } from 'immutable';

export interface HeaderState {
  navbarCollapsed: boolean;
}

const initialHeader = {
  navbarCollapsed: true
};

class HeaderStateRecord extends Record(initialHeader) implements HeaderState {
  navbarCollapsed: boolean;
  constructor(data) {
    super(data);
  }
}

export function headerReducer(state: HeaderState = new HeaderStateRecord(initialHeader), action: HeaderAction): HeaderState {
  switch (action.type) {
    case HeaderActionTypes[HeaderActionType.COLLAPSE]:
      state = Object.assign({}, state, { navbarCollapsed: true });
      break;
    case HeaderActionTypes[HeaderActionType.EXPAND]:
      state = Object.assign({}, state, { navbarCollapsed: false });
      break;
    case HeaderActionTypes[HeaderActionType.TOGGLE]:
      state = Object.assign({}, state, { navbarCollapsed: !state.navbarCollapsed });
      break;
    default:
  }
  return state;
};
